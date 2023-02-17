"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextViewer = exports.InputFiled = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var InputFiled = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  return /*#__PURE__*/_react["default"].createElement(_reactNative.SafeAreaView, null, /*#__PURE__*/_react["default"].createElement(_reactNative.TextInput, {
    style: props.styles,
    onChangeText: props.onChangeNumber,
    value: props.number,
    placeholder: props.placeholder,
    keyboardType: props.keyboardType,
    onFocus: props.onFocus ? function () {
      return props.onFocus();
    } : function () {},
    ref: ref
  }));
});
exports.InputFiled = InputFiled;
var TextViewer = function TextViewer(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactNative.Text, null, props.text);
};
exports.TextViewer = TextViewer;
var ClickableCell = function ClickableCell(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactNative.TouchableOpacity, {
    onPress: function onPress() {
      return props.onPress(props);
    }
  }, props.text);
};