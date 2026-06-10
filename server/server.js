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

// conect to database
connectDB();

// setup middlewares
app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// setup production
if (process.env.NODE_ENV === "production") {
  // Client (main app) - your existing setup
  const clientPath = path.join(__dirname, "build");
  const clientIndexPath = path.resolve(__dirname, "build", "index.html");
  app.use(express.static(clientPath));

  // Admin panel - add this
  const adminPath = path.join(__dirname, "admin-build");
  const adminIndexPath = path.resolve(__dirname, "admin-build", "index.html");
  app.use("/admin", express.static(adminPath));

  // Handle admin React Router routes (e.g., /admin/dashboard, /admin/rooms)
  app.get("/admin/*", (req, res) => {
    res.sendFile(adminIndexPath);
  });

  // Catch-all for main client (must come LAST)
  app.use((req, res) => {
    res.sendFile(clientIndexPath);
  });
}
// if (process.env.NODE_ENV === "production") {
//   const publicpath = path.join(__dirname, "build");
//   const filePath = path.resolve(__dirname, "build", "index.html");
//   app.use(express.static(publicpath));

//   app.use((req, res) => {
//     res.sendFile(filePath);
//   });
// }

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
