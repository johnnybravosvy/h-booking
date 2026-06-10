const dotenv = require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 6000;

connectDB();

app.use(cookieParser());
app.use(express.json());

// API routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// Production static files
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "build");
  const clientIndexPath = path.resolve(__dirname, "build", "index.html");
  const adminPath = path.join(__dirname, "admin-build");
  const adminIndexPath = path.resolve(__dirname, "admin-build", "index.html");

  app.use(express.static(clientPath));
  app.use("/admin", express.static(adminPath));

  // Admin SPA fallback
  app.use("/admin", (req, res) => {
    res.sendFile(adminIndexPath);
  });

  // Main client catch-all
  app.use((req, res) => {
    res.sendFile(clientIndexPath);
  });
}

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
