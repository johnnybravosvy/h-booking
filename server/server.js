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
  const clientPath = path.join(__dirname, "build");
  const clientIndexPath = path.resolve(__dirname, "build", "index.html");
  const adminPath = path.join(__dirname, "admin-build");
  const adminIndexPath = path.resolve(__dirname, "admin-build", "index.html");

  // Serve static files
  app.use(express.static(clientPath));
  app.use("/admin", express.static(adminPath));

  // Admin SPA fallback — catches any /admin/* that isn't a static file
  app.use("/admin", (req, res) => {
    res.sendFile(adminIndexPath);
  });

  // Main client catch-all
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
