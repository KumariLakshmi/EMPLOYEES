const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }

const empSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      default: uuidv4,
    },
    empName: {
      type: String,
      required: true,
    },
    empMobile: {
        type: Number,
		maxlength: 10,
		required: true,
    },
    empEmailId: {
        type: String,
		required: true,
		trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    empRole: {
      type: String,
      required: true,
    },
    empSal: {
      type: Number,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    address: [
      {
        doorNumber: {
          type: Number,
          required: true,
        },
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        pinCode: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

empSchema.pre("save", async function (next) {
  try {
    console.log("before user password");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next("empschema model err", error);
  }
});
empSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
module.exports = mongoose.model("Employee", empSchema);
