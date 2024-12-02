const router = require("express").Router();
const Record = require("../models/Record");

// Create a new record
router.route("/add").post((req, res) => {
  const { name, nic, bdate, gender, prescriptions, appointments, tests, reports } = req.body;

  const newRecord = new Record({
    name,
    nic,
    bdate,
    gender,
    prescriptions,
    appointments,
    tests,
    reports,
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
  Record.find()
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
  const rid = req.params.id;
  Record.findById(rid)
    .then((record) => {
      if (record) {
        res.status(200).json({ status: "Record fetched", record: record });
      } else {
        res.status(404).json({ status: "Record not found" });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ status: "Error in getting record details", error: err.message });
    });
});

// Search for records with a given query
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const results = await Record.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { nic: { $regex: query, $options: "i" } },
        // Add additional fields for searching if needed
      ],
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
  Record.findByIdAndDelete(rid)
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
  const { name, nic, bdate, gender, prescriptions, appointments, tests, reports } = req.body;

  const updateRecord = {
    name,
    nic,
    bdate,
    gender,
    prescriptions,
    appointments,
    tests,
    reports,
  };

  Record.findByIdAndUpdate(rid, updateRecord, { new: true })
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

module.exports = router;
