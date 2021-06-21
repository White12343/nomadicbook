"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _lib = _interopRequireDefault(require("vuetify/lib"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src/plugins/vuetify.js
_vue["default"].use(_lib["default"]);

var opts = {};

var _default = new _lib["default"](opts);

exports["default"] = _default;