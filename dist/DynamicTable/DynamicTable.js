"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DynamicTable;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _DynamicTableHandler = require("./DynamicTableHandler");
var _CellInputComponent = _interopRequireDefault(require("./CellInputComponent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function DynamicTable(props) {
  var tableData = props.tableData,
    columnWidthsTemplate = props.columnWidthsTemplate,
    columnCount = props.columnCount,
    _props$cellHook = props.cellHook,
    cellHook = _props$cellHook === void 0 ? {} : _props$cellHook,
    defaultColumnType = props.defaultColumnType,
    _props$onPressRow = props.onPressRow,
    onPressRow = _props$onPressRow === void 0 ? function () {} : _props$onPressRow,
    renderPopup = props.renderPopup,
    showPopup = props.showPopup;
  var _useWindowDimensions = (0, _reactNative.useWindowDimensions)(),
    width = _useWindowDimensions.width;
  var _useState = (0, _react.useState)(columnWidthsTemplate),
    _useState2 = _slicedToArray(_useState, 2),
    columnWidths = _useState2[0],
    setColumnWidths = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    topH = _useState4[0],
    setTop = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    focusedRow = _useState6[0],
    setFocusedRow = _useState6[1];
  var elementsRef = (0, _react.useRef)(tableData.map(function () {
    return /*#__PURE__*/(0, _react.createRef)();
  }));
  (0, _react.useEffect)(function () {
    var newWidths = (0, _DynamicTableHandler.calculateColumnWidths)(columnWidths, width, columnCount);
    setColumnWidths(newWidths);
  }, [width]);
  var _onFocus = function onFocus(rowIndex) {
    var _refData$current;
    setFocusedRow(rowIndex);
    var refData = (elementsRef === null || elementsRef === void 0 ? void 0 : elementsRef.current[rowIndex]) || {};
    if (refData !== null && refData !== void 0 && (_refData$current = refData.current) !== null && _refData$current !== void 0 && _refData$current.measureInWindow) {
      var _refData$current2;
      var measureInWindow = refData === null || refData === void 0 ? void 0 : (_refData$current2 = refData.current) === null || _refData$current2 === void 0 ? void 0 : _refData$current2.measureInWindow;
      measureInWindow(function (fx, fy, width, height, px, py) {
        setTop(height);
        onPressRow(rowIndex);
      });
    }
  };
  var element = function element(placeholder, rowIndex, ref) {
    return /*#__PURE__*/_react["default"].createElement(_CellInputComponent["default"], {
      placeholder: placeholder,
      onFocus: function onFocus() {
        return _onFocus(rowIndex);
      },
      ref: ref
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_reactNative.View, null, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
    style: styles.table
  }, tableData.map(function (rowData, rowIndex) {
    return /*#__PURE__*/_react["default"].createElement(_reactNative.View, null, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
      style: styles.row
    }, rowData.columns.map(function (cellData, cellIndex) {
      var columnType = rowData.questionSelectionType || defaultColumnType;
      var cellHookData = cellHook && cellHook[columnType] ? cellHook[columnType]({
        rowType: rowData.rowType,
        cellData: cellData,
        rowIndex: rowIndex,
        cellIndex: cellIndex,
        columnWidths: columnWidths
      }) : {};
      var ref = elementsRef === null || elementsRef === void 0 ? void 0 : elementsRef.current[rowIndex];
      return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
        key: "".concat(rowIndex, "_").concat(cellIndex),
        style: [styles.cell, {
          width: cellHookData.width
        }]
      }, rowData.values && rowData.values[cellIndex] ? /*#__PURE__*/_react["default"].createElement(_reactNative.Text, null, rowData.values[cellIndex]) : element(cellHookData.placeholder, rowIndex, ref));
    })), /*#__PURE__*/_react["default"].createElement(_reactNative.View, null, focusedRow === rowIndex && showPopup && renderPopup ? renderPopup(topH, rowIndex) : null));
  })));
}
var styles = _reactNative.StyleSheet.create({
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