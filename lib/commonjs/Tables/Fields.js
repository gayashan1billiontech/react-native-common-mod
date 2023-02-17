"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextViewer = exports.InputFiled = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const InputFiled = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, null, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    style: props.styles,
    onChangeText: props.onChangeNumber,
    value: props.number,
    placeholder: props.placeholder,
    keyboardType: props.keyboardType,
    onFocus: props.onFocus ? () => props.onFocus() : () => {},
    ref: ref
  }));
});
exports.InputFiled = InputFiled;
const TextViewer = props => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, props.text);
};
exports.TextViewer = TextViewer;
const ClickableCell = props => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: () => props.onPress(props)
  }, props.text);
};
//# sourceMappingURL=Fields.js.map