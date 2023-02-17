import React from 'react';
import { SafeAreaView, TouchableOpacity, TextInput, Text } from 'react-native';
const InputFiled = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement(SafeAreaView, null, /*#__PURE__*/React.createElement(TextInput, {
    style: props.styles,
    onChangeText: props.onChangeNumber,
    value: props.number,
    placeholder: props.placeholder,
    keyboardType: props.keyboardType,
    onFocus: props.onFocus ? () => props.onFocus() : () => {},
    ref: ref
  }));
});
const TextViewer = props => {
  return /*#__PURE__*/React.createElement(Text, null, props.text);
};
const ClickableCell = props => {
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => props.onPress(props)
  }, props.text);
};
export { InputFiled, TextViewer };
//# sourceMappingURL=Fields.js.map