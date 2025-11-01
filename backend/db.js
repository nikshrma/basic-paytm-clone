const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { model, Schema} = require("mongoose") 
mongoose.connect(process.env.mongoURL);
const userSchema = new Schema({
        username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
        },
        firstName:{
            type:String,
            required: true,
            minLength: 3,
            maxLength:50
        },
        lastName:{
            type:String,
            required: true,
            minLength:3,
            maxLength:50
        },
        password:{
            type:String,
            required:true,
            minLength:6
        }
});
const accountSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const Account = model("Account" , accountSchema);
const User = model("User" , userSchema);
module.exports = {
    User ,
    Account
};