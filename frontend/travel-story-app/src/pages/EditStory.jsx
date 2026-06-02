import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cropper from "react-easy-crop";
import "./AddStory.css";

import API_URL from "../config";


const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [visitedLocation, setVisitedLocation] = useState("");
  const [visitedDate, setVisitedDate] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /* LOAD OLD STORY */
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/story/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const s = res.data;

        setTitle(s.title || "");
        setStory(s.story || "");
        setVisitedLocation(s.visitedLocation || "");

        if (s.visitedDate) {
          setVisitedDate(s.visitedDate.split("T")[0]);
        }

        if (s.image) {
          setPreviewUrl(s.image);
        }
      })
      .catch((err) =>
        console.error("Fetch error:", err)
      );
  }, [id]);

  /* IMAGE SELECT */
  const onFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    (_, croppedPixels) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  /* SAVE CROP */
  const handleSaveCrop = async () => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise(
      (resolve) => (image.onload = resolve)
    );

    const canvas =
      document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width =
      croppedAreaPixels.width;
    canvas.height =
      croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      const croppedFile = new File(
        [blob],
        imageFile.name,
        {
          type: imageFile.type,
        }
      );

      setImageFile(croppedFile);
      setPreviewUrl(
        URL.createObjectURL(croppedFile)
      );
      setShowCropper(false);
    }, imageFile.type);
  };

  /* UPDATE STORY */
const handleUpdate = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("story", story);
  formData.append("visitedLocation", visitedLocation);
  formData.append("visitedDate", visitedDate);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const res = await axios.put(
      `${API_URL}/edit-travel-story/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

    alert("Updated Successfully");
    navigate("/my-stories");

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Failed to update story");
  }
};

  return (
    <div className="addstory-page">
      <div className="addstory-card">
        <div className="right-panel">
          <h2>Edit Story</h2>

          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              required
            />

            <textarea
              value={story}
              onChange={(e) =>
                setStory(
                  e.target.value
                )
              }
              required
            />

            <input
              type="text"
              value={
                visitedLocation
              }
              onChange={(e) =>
                setVisitedLocation(
                  e.target.value
                )
              }
              required
            />

            <input
              type="date"
              value={visitedDate}
              onChange={(e) =>
                setVisitedDate(
                  e.target.value
                )
              }
              required
            />

            <div className="file-upload-wrapper">
              <label
                htmlFor="file-upload"
                className="custom-file-upload"
              >
                📁 Choose Image
              </label>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={
                  onFileChange
                }
              />
            </div>

            {previewUrl && (
              <div className="image-preview">
                <p>
                  Current /
                  Selected Image
                </p>
                <img
                  src={
                    previewUrl
                  }
                  alt="preview"
                />
              </div>
            )}

            <button type="submit">
              Update Story
            </button>
          </form>
        </div>
      </div>

      {showCropper && (
        <div className="cropper-modal-overlay">
          <div className="cropper-modal-content">
            <h3>
              Adjust Visible
              Area
            </h3>

            <div className="crop-container">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={300 / 220}
                onCropChange={
                  setCrop
                }
                onCropComplete={
                  onCropComplete
                }
                onZoomChange={
                  setZoom
                }
              />
            </div>

            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) =>
                setZoom(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <div className="cropper-buttons">
              <button
                type="button"
                onClick={() =>
                  setShowCropper(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleSaveCrop
                }
              >
                Apply Part
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditStory;