const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingsModel");
const Airplane = require("../models/airplaneModel");
const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");

// book a seat

router.post("/book-seat", async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      user: req.body.userId,
    });
    await newBooking.save();
    const airplane = await Airplane.findById(req.body.airplane);
    airplane.seatsBooked = [...airplane.seatsBooked, ...req.body.seats];
    await airplane.save();
    res.status(200).send({
      message: "Booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking failed",
      data: error,
      success: false,
    });
  }
});
//For flutter project this code
router.post("/book-flight", async (req, res) => {
  console.log("Booking Failed");
  try {
    console.log(req.body);
    const { airplane, users, seats, transactionId } = req.body;
    const newBooking = new Booking({
      airplane,
      users,
      seats,
      transactionId,
    });
    await newBooking.save();
    airplane.seatsBooked = [];
    await airplane.save();
    res.status(200).send({
      message: "Booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking for flutter failed",
      data: error,
      success: false,
    });
  }
});
/* ---------------------------------------------*/
// make payment

router.post("/make-payment", async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: amount,
        currency: "npr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      res.status(200).send({
        message: "Payment successful",
        data: {
          transactionId: payment.source.id,
        },
        success: true,
      });
    } else {
      res.status(500).send({
        message: "Payment failed",
        data: error,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Payment failed",
      data: error,
      success: false,
    });
  }
});

// get bookings by user id
router.post("/get-bookings-by-user-id", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("airplane")
      .populate("user");
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  }
});

// // get all bookings
// router.post("/get-all-bookings", authMiddleware, async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate("airplane").populate("user");
//     res.status(200).send({
//       message: "Bookings fetched successfully",
//       data: bookings,
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Bookings fetch failed",
//       data: error,
//       success: false,
//     });
//   }
// });

module.exports = router;
