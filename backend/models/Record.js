const mongoose = require("mongoose");

const schema = mongoose.Schema;



const recordSchema = new schema ({
   /* patient:{
        type: schema.Types.ObjectId , ref: 'Patient' ,
        required : true 
    },*/
    name:{
        type:String,
        required:true
    },
    nic:{
        type:String,
        required:true
    },
    bdate:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default: "Select Gender",
        enum: ["Select Gender","Male", "Female"],
    },
    prescriptions:{
        type:Number ,
        //required: true
    },
    appointments:{
        type:Number,
        //required:true
    },
    tests:{
        type:Number,
        //required:true
    },
    reports:{
        type:Number,
        //required:true
    },
    date:{
        type:Date,
        default:mongoose.now
    }
    
    

})




const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
