"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _index = _interopRequireDefault(require("../routes/index"));
var _error = _interopRequireDefault(require("../middleware/error"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_error["default"]);
app.use('/public', _express["default"]["static"]("".concat(process.cwd(), "/public")));
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.use('/api', _index["default"]);
var _default = app;
exports["default"] = _default;