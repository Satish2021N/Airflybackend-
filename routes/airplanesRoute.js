const router = require("express").Router();
const Airplane = require("../models/airplaneModel");
const authMiddleware = require("../middlewares/authMiddleware");
//Add Airplane
router.post("/add-airplane", async (req, res) => {
  try {
    const existingAirplane = await Airplane.findOne({
      number: req.body.number,
    });
    if (existingAirplane) {
      return res.status(200).send({
        success: false,
        message: "Airplane already exists",
      });
    }
    const newAirplane = new Airplane(req.body);
    await newAirplane.save();
    return res.status(200).send({
      success: true,
      message: "Airplane Added Successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//update-airplane
router.post("/update-airplane", async (req, res) => {
  try {
    await Airplane.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Airplane updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

router.post("/delete-airplane", async (req, res) => {
  try {
    await Airplane.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Airplane deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

//get all airplanes
router.post("/get-all-airplanes", async (req, res) => {
  try {
    const airplanes = await Airplane.find();
    return res.status(200).send({
      success: true, 
      count:airplanes.length,
      message: "Airplanes fetched successfully",
      data: airplanes,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});


router.post("/get-airplane-by-id", async (req, res) => {
  try {
    const airplane = await Airplane.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Airplane fetched successfully",
      data: airplane,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;
