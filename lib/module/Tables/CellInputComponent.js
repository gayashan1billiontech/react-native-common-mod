function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { InputFiled } from './Fields';
const CellInputComponent = /*#__PURE__*/React.forwardRef((props, ref) => {
  return /*#__PURE__*/React.createElement(InputFiled, _extends({}, props, {
    placeholder: props.placeholder,
    keyboardType: 'default',
    ref: ref
  }));
});
export default CellInputComponent;
//# sourceMappingURL=CellInputComponent.js.map