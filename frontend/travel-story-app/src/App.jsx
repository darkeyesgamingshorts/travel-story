import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddStory from "./pages/AddStory";
import MyStories from "./pages/MyStories";
import EditStory from "./pages/EditStory";
import LearnMore from "./pages/LearnMore";
import StoryDetails from "./pages/StoryDetails";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/add-story"
        element={<AddStory />}
      />

      <Route
        path="/my-stories"
        element={<MyStories />}
      />

      <Route
        path="/edit-story/:id"
        element={<EditStory />}
      />

      <Route
        path="/story/:id"
        element={<StoryDetails />}
      />

      <Route
        path="/learn-more"
        element={<LearnMore />}
      />

    </Routes>
  );
}

export default App;