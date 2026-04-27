const { Router } = require("express");
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
} = require("../controllers/bookingController");

const router = Router();

// get all bookings
router.get("/", getBookings);

// create booking
router.post("/", createBooking);

// get a single Booking
router.get("/:id", getBooking);

// update booking
router.put("/:id", updateBooking);

//delete Booking
router.delete("/:id", deleteBooking);

module.exports = router;
