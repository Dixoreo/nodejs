const express = require("express");
const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024, 
  },
});

const Data = new mongoose.model("Data", dbSchema);

module.exports = Data;
