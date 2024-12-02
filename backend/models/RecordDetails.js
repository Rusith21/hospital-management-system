const mongoose = require("mongoose");

const schema = mongoose.Schema;



const myrecordDetailsSchema = new schema ({
   /* patient:{
        type: schema.Types.ObjectId , ref: 'Patient' ,
        required : true 
    },*/
    username:{
        type:String,
        
    },
    result:{
        type:String,
        
    },
    details:{
        type:String,
        
    }
    
})

const RecordDetails = mongoose.model("RecordDetails", myrecordDetailsSchema);

module.exports = RecordDetails;
