const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const RecordDetails = require("../models/myRecord");

// Create a new record
router.route("/add").post((req, res) => {
  const { record, doctor, diagnosis, ward, prescription, drugs } = req.body;

  const newRecord = new RecordDetails({
    record,
    doctor,
    diagnosis,
    ward,
    prescription,
    drugs,
  });

  newRecord
    .save()
    .then(() => {
      res.json("Record Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

// Get all records
router.route("/").get((req, res) => {
  RecordDetails.find()
    .then((records) => {
      res.json(records);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error: " + err);
    });
});

// Get a specific record by ID
router.route("/get/:id").get((req, res) => {
  const recordId = req.params.id; // Use the parameter name 'id' here
  RecordDetails.find({ record: recordId }) // Query by the record ID
    .then((details) => {
      res.status(200).json({ status: "Details fetched", details });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ status: "Error in getting details", error: err.message });
    });
});


// Search for records with a given query
router.get("/search/:record", async (req, res) => {
  const rid = req.params.record;
  try {
    const query = rid;
    const results = await RecordDetails.find({
      $or: [
        { name: { $regex: query, $options: 'i' },
        // Add additional fields for searching if needed
    }],
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a record by ID
router.route("/delete/:id").delete((req, res) => {
  const rid = req.params.id;
  RecordDetails.findByIdAndDelete(rid)
    .then(() => {
      res.status(200).json({ status: "Record deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: "Error with deleting the record", error: err.message });
    });
});

// Update a record by ID
router.route("/update/:id").put((req, res) => {
  const rid = req.params.id;
  const { record, doctor, diagnosis, ward, prescription, drugs } = req.body;

  const updateRecord = {
    record,
    doctor,
    diagnosis,
    ward,
    prescription,
    drugs,
  };

  RecordDetails.findByIdAndUpdate(rid, updateRecord, { new: true })
    .then((record) => {
      if (record) {
        res.status(200).json({ status: "Record updated", record: record });
      } else {
        res.status(404).json({ status: "Record not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ status: "Error with updating information", error: err.message });
    });
});

// Get a specific record detail by ID
router.route("/getDetail/:id").get((req, res) => {
  const detailId = req.params.id;

  RecordDetails.findById(detailId)
    .then((detail) => {
      if (detail) {
        res.status(200).json({ status: "Detail fetched", detail });
      } else {
        res.status(404).json({ status: "Detail not found" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ status: "Error in getting detail", error: err.message });
    });
});


module.exports = router;
