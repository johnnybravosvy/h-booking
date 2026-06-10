const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");

const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} = require("../controllers/bookingController");

const router = Router();

// get all bookings
router.get("/", auth, getBookings);

// create booking
router.post("/", createBooking);

// get a single Booking
router.get("/:id", getBooking);

// update booking
router.put("/:id", auth, updateBooking);

//delete Booking
router.delete("/:id", auth, deleteBooking);

module.exports = router;
