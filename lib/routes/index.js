"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controller = require("../controller/controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.use(_express["default"].json());
router.use(_express["default"].urlencoded({
  extended: true
}));
router.post('/users', _controller.addUser);
router.post('/users/:_id/exercises', _controller.addExercise);
router.get('/users/:_id/logs', _controller.getUserLogs);
var _default = router;
exports["default"] = _default;