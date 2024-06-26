import mongoose from "mongoose";

const reqschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    minLength: [30, "Description must contain at least 30 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
  },
  Gender: {
    type: String,
    required: [true, "Please provide a Gender."],
  },
  UPI: {
    type: String,
    required: [true, "Please provide a UPI name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [20, "Location must contian at least 20 characters!"],
  },
  fixedAmount: {
    type: Number,
    minLength: [4, "Amount must contain at least 4 digits"],
    maxLength: [9, "Amount cannot exceed 9 digits"],
  },
  AmountFrom: {
    type: Number,
    minLength: [4, "Amount must contain at least 4 digits"],
    maxLength: [9, "Amount cannot exceed 9 digits"],
  },
  AmountTo: {
    type: Number,
    minLength: [4, "Amount must contain at least 4 digits"],
    maxLength: [9, "Amount cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", reqschema);
