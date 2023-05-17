"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userCollectionName = 'users';
var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true
  }
});
var userModel = _mongoose["default"].model(userCollectionName, userSchema);
exports.userModel = userModel;