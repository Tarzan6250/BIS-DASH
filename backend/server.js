const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, default: null },
  college: { type: String, default: "" },
  profilePic: { type: Number, default: 1 }, // Stores the profile picture index (1-4)
});

const User = mongoose.model("User", userSchema);

// Routes

// Fetch User Details by Username
app.get("/user/details/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }, "username age college profilePic");
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Update User Details
app.put("/user/details", async (req, res) => {
  const { username, age, college, profilePic } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    // Update user details
    if (age !== undefined) user.age = age;
    if (college !== undefined) user.college = college;
    if (profilePic !== undefined) user.profilePic = profilePic;

    // Save the updated user data
    await user.save();

    res.json({ success: true, message: "Details updated successfully!" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Register User
app.post("/register", async (req, res) => {
  const { username, password, age, college } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, age, college });
    await newUser.save();
    res.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Login User
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    res.json({ success: true, message: "Login successful!", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
