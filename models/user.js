let mongoose = require("mongoose");
let userSchema = mongoose.Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    password: { 
        type: String, 
        required: true, 
    }
}, { timestamps: true });
let User = mongoose.model("User", userSchema);

userSchema.index({ email: 1, password: 1 }, (err) => {
    if (err) {
      console.error("Error creating index:", err.message);
    }
});

module.exports = User;