"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exerciseModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = require("./user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var exerciseCollectionName = 'exercises';
var exerciseSchema = new _mongoose["default"].Schema({
  user: {
    type: [_mongoose["default"].Schema.Types.ObjectId],
    ref: _user.userModel
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: String,
    match: /^\d{4}-\d{2}-\d{2}$/,
    required: true
  }
  //date: { type: String, required: true}
});

var exerciseModel = _mongoose["default"].model(exerciseCollectionName, exerciseSchema);
exports.exerciseModel = exerciseModel;