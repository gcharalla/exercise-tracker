"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var handleError = function handleError(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    msg: 'Ocurrio un error interno del Servidor'
  });
};
var _default = handleError;
exports["default"] = _default;