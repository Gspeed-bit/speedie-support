const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'please add your first name'] },
  lastName: { type: String, required: [true, 'please add your last name'] },
  email: { type: String, required: [true, 'please add an email'], unique: true },
  password: { type: String, required: [true, 'please add a password'] },
  isAdmin:{
    type:Boolean,
    required:true,
    default:false
  }
  
},

{timestamps:true,
});
module.exports = mongoose.model("User", userSchema)