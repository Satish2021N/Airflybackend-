const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    airplane: {
      type: mongoose.Schema.ObjectId,
      ref: "airplanes",
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      require: true,
    },
    seats: {
      type: Array,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
