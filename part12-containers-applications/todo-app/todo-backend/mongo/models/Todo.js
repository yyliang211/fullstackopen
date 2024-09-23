const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
});

todoSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Todo", todoSchema);
