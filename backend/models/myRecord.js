const mongoose = require("mongoose");

const schema = mongoose.Schema;

const myRecordSchema = new schema (
    {
    record: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
  },
  doctor: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  ward: {
    type: String,
  },
  prescription: {
    type: String,
  },
  drugs: {
    type: String,
  },
}, {
  timestamps: true,
});




const MyRecord = mongoose.model("MyRecord", myRecordSchema);

module.exports = MyRecord;
