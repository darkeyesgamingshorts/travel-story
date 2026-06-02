require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); 
const cloudinary = require("cloudinary").v2;

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use("/assets", express.static("assets"));

/* ================= CONFIG ================= */
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "travel-story",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* ================= DATABASE ================= */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  cloudinary.api.ping()
  .then(res => console.log("=== CLOUDINARY SUCCESS ===", res))
  .catch(err => console.error("=== CLOUDINARY FAILED ===", err.message));


/* ================= MODELS ================= */

const User = mongoose.model(
    "users",
    new mongoose.Schema({
        name: String,
        email: {
            type: String,
            unique: true
        },
        password: String
    })
);

const Story = mongoose.model(
    "travelstories",
    new mongoose.Schema({
        title: String,
        story: String,
        visitedLocation: String,
        visitedDate: String,
        image: String,
        createdBy: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    })
);

/* ================= MULTER (FIXED FOR RENDER) ================= */

const upload = multer({
  storage: multer.memoryStorage(),
});

/* ================= AUTH FIXED ================= */
const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token" });
    }

    // FIXED: Added the [1] index to correctly extract the token payload string
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};



app.get("/test-upload", async (req, res) => {
    try {

        const result = await cloudinary.uploader.upload(
            "https://res.cloudinary.com/demo/image/upload/sample.jpg"
        );

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json(err);
    }
});



/* ================= HOME ================= */

app.get("/", (req,res)=>{
  res.send("API Running");
});


/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {

    try {

        const { email, password } =
            req.body;

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const valid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!valid) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET
        );

        res.json({
            token,
            user
        });

    } catch (err) {

        res.status(500).json(err);
    }
});

/* ================= REGISTER ================= */

app.post("/create-account", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const existing =
            await User.findOne({ email });

        if (existing) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashed =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            new User({
                name,
                email,
                password: hashed
            });

        await user.save();

        res.json({
            message: "Account created"
        });

    } catch (err) {

        res.status(500).json(err);
    }
});

/* ================= PUBLIC STORIES ================= */

app.get("/public-stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({
      createdAt: -1,
    });

    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

/* ================= USER STORIES ================= */

app.get(
    "/search-stories",
    auth,
    async (req, res) => {

        const stories =
            await Story.find({
                createdBy:
                    req.user.id
            });

        res.json(stories);
    }
);

/* ================= STORY DETAILS ================= */

app.get(
    "/story/:id",
    auth,
    async (req, res) => {

        const story =
            await Story.findById(
                req.params.id
            );

        res.json(story);
    }
);

/* ================= ADD STORY ================= */
app.post(
  "/upload-image",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = "";

      if (req.file) {
        const result = await uploadToCloudinary(
          req.file.buffer
        );

        imageUrl = result.secure_url;
      }

      const story = new Story({
        title: req.body.title,
        story: req.body.story,
        visitedLocation: req.body.visitedLocation,
        visitedDate: req.body.visitedDate,
        image: imageUrl,
        createdBy: req.user.id,
      });

      await story.save();

      res.json({
        success: true,
        story,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

/* ================= EDIT STORY (FIXED) ================= */
app.put(
  "/edit-travel-story/:id",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {

      const updatedData = {
        title: req.body.title,
        story: req.body.story,
        visitedLocation: req.body.visitedLocation,
        visitedDate: req.body.visitedDate,
      };

      if (req.file) {

        const result = await uploadToCloudinary(
          req.file.buffer
        );

        updatedData.image = result.secure_url;

      } else if (req.body.image) {

        updatedData.image = req.body.image;
      }

      const story = await Story.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      if (!story) {
        return res.status(404).json({
          message: "Story not found"
        });
      }

      res.json(story);

    } catch (err) {

      console.error("EDIT ERROR:", err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);


/* ================= DELETE STORY ================= */

app.delete(
    "/delete-story/:id",
    auth,
    async (req, res) => {
        try {
            await Story.findByIdAndDelete(req.params.id);
            res.json({ success: true, message: "Story deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

