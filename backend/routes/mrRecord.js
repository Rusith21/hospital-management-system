const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let myRecord = require("../models/myRecord");
const Record = require("../models/Record");
const Patient = require("../models/Patient");
const nodemailer = require("nodemailer");

router.route("/add").post(async (req, res) => {
  const doctor = req.body.doctor;
  const diagnosis = req.body.diagnosis;
  const ward = req.body.ward;
  const prescription = req.body.prescription;
  const drugs = req.body.drugs;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "hospitalitp@zohomail.com",
      pass: "Sliit@321",
    },
  });

  const newRecord = new myRecord({
    doctor,
    diagnosis,
    ward,
    prescription,
    drugs,
  });

  const status = "myRecord Created";
  const updatedRecord = {
    status,
  };

  newRecord
    .save()
    .then(() => {
      const update = Record.findByIdAndUpdate(Record, updatedRecord)
        .then(() => {
          const usr = Patient.findById(patient)
            .then((patient) => {
              const mailOptions = {
                from: "hospitalitp@zohomail.com",
                to: `${patient.email}`,
                subject: "Appointment Made",
                text: `Hello \nYour myRecord results have been updated check your profile.\n Thank you !`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            })
            .catch((err) => {
              console.log(err.message);
    
            });

          res.json("Prescription Added");
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({
            status: "Error with updating information",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/getByRecord/:id").get(async (req, res) => {
  let tid = req.params.id;

  const rpt = await myRecord.findOne({ Record: tid })
    .then((myRecord) => {
      res.status(200).send({ status: "Reprt fetched", myRecord: myRecord });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting myRecord details",
        error: err.message,
      });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let pid = req.params.id;

  const rpt = await myRecord.findById(pid)
    .then((myRecord) => {
      res.status(200).send({ status: "Patient fetched", myRecord: myRecord });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting myRecord details",
        error: err.message,
      });
    });
});

router.route("/update/:id").put(async (req, res) => {
  let rid = req.params.id;

  const details = req.body.details;
  const patient = req.body.pid;
  const result = req.body.result;
  const Record = req.body.tid;
  const date = mongoose.now();

  const updatemyRecord = {
    details,
    patient,
    result,
    Record,
    date,
  };

  const update = await myRecord.findByIdAndUpdate(rid, updatemyRecord)
    .then(() => {
      res.status(200).send({ status: "myRecord updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating information",
        error: err.message,
      });
    });
});

router.get("/patient/search/:id", async (req, res) => {
  let pid = req.params.id;
  try {
    const query = req.query.query;
    const results = await myRecord.find({
      patient: pid,
      $or: [{ details: { $regex: query, $options: "i" } }],
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
