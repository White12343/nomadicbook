"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _colors = _interopRequireDefault(require("vuetify/lib/util/colors"));

var _vuetify = _interopRequireDefault(require("vuetify"));

require("vuetify/dist/vuetify.min.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// src/plugins/vuetify.js
_vue["default"].use(_vuetify["default"]);

var opts = {
  theme: {
    themes: {
      light: {
        primary: '#005e63',
        // #E53935
        secondary: _colors["default"].red.lighten4,
        // #FFCDD2
        accent: _colors["default"].indigo.base // #3F51B5

      }
    }
  }
};

var _default = new _vuetify["default"](opts);

exports["default"] = _default;