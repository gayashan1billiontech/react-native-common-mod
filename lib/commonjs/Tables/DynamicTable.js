"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DynamicTable;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _DynamicTableHandler = require("./DynamicTableHandler");
var _CellInputComponent = _interopRequireDefault(require("./CellInputComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DynamicTable(props) {
  const {
    tableData,
    columnWidthsTemplate,
    columnCount,
    cellHook = {},
    defaultColumnType,
    onPressRow = () => {},
    renderPopup,
    showPopup
  } = props;
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const [columnWidths, setColumnWidths] = (0, _react.useState)(columnWidthsTemplate);
  const [topH, setTop] = (0, _react.useState)(0);
  const [focusedRow, setFocusedRow] = (0, _react.useState)(0);
  const elementsRef = (0, _react.useRef)(tableData.map(() => /*#__PURE__*/(0, _react.createRef)()));
  (0, _react.useEffect)(() => {
    const newWidths = (0, _DynamicTableHandler.calculateColumnWidths)(columnWidths, width, columnCount);
    setColumnWidths(newWidths);
  }, [width]);
  const onFocus = rowIndex => {
    var _refData$current;
    setFocusedRow(rowIndex);
    const refData = (elementsRef === null || elementsRef === void 0 ? void 0 : elementsRef.current[rowIndex]) || {};
    if (refData !== null && refData !== void 0 && (_refData$current = refData.current) !== null && _refData$current !== void 0 && _refData$current.measureInWindow) {
      var _refData$current2;
      const measureInWindow = refData === null || refData === void 0 ? void 0 : (_refData$current2 = refData.current) === null || _refData$current2 === void 0 ? void 0 : _refData$current2.measureInWindow;
      measureInWindow((fx, fy, width, height, px, py) => {
        setTop(height);
        onPressRow(rowIndex);
      });
    }
  };
  const element = (placeholder, rowIndex, ref) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CellInputComponent.default, {
    placeholder: placeholder,
    onFocus: () => onFocus(rowIndex),
    ref: ref
  }));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.table
  }, tableData.map((rowData, rowIndex) => /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, rowData.columns.map((cellData, cellIndex) => {
    const columnType = rowData.questionSelectionType || defaultColumnType;
    const cellHookData = cellHook && cellHook[columnType] ? cellHook[columnType]({
      rowType: rowData.rowType,
      cellData,
      rowIndex,
      cellIndex,
      columnWidths
    }) : {};
    const ref = elementsRef === null || elementsRef === void 0 ? void 0 : elementsRef.current[rowIndex];
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: `${rowIndex}_${cellIndex}`,
      style: [styles.cell, {
        width: cellHookData.width
      }]
    }, rowData.values && rowData.values[cellIndex] ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, rowData.values[cellIndex]) : element(cellHookData.placeholder, rowIndex, ref));
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, focusedRow === rowIndex && showPopup && renderPopup ? renderPopup(topH, rowIndex) : null)))));
}
const styles = _reactNative.StyleSheet.create({
  table: {
    margin: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cell: {
    borderColor: '#3FB4F7',
    borderWidth: 0.5,
    padding: 10
  }
});
//# sourceMappingURL=DynamicTable.js.map