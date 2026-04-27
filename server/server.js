const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const port = process.env.PORT || 6000;

// conect to database
connectDB();

// setup middlewares
app.use(express.json());

// routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
