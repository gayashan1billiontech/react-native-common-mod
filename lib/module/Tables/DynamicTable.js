import React, { useRef, createRef, useState, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions, Text } from 'react-native';
import { calculateColumnWidths } from "./DynamicTableHandler";
import CellInputComponent from './CellInputComponent';
export default function DynamicTable(props) {
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
  } = useWindowDimensions();
  const [columnWidths, setColumnWidths] = useState(columnWidthsTemplate);
  const [topH, setTop] = useState(0);
  const [focusedRow, setFocusedRow] = useState(0);
  const elementsRef = useRef(tableData.map(() => /*#__PURE__*/createRef()));
  useEffect(() => {
    const newWidths = calculateColumnWidths(columnWidths, width, columnCount);
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
  const element = (placeholder, rowIndex, ref) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CellInputComponent, {
    placeholder: placeholder,
    onFocus: () => onFocus(rowIndex),
    ref: ref
  }));
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: styles.table
  }, tableData.map((rowData, rowIndex) => /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
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
    return /*#__PURE__*/React.createElement(View, {
      key: `${rowIndex}_${cellIndex}`,
      style: [styles.cell, {
        width: cellHookData.width
      }]
    }, rowData.values && rowData.values[cellIndex] ? /*#__PURE__*/React.createElement(Text, null, rowData.values[cellIndex]) : element(cellHookData.placeholder, rowIndex, ref));
  })), /*#__PURE__*/React.createElement(View, null, focusedRow === rowIndex && showPopup && renderPopup ? renderPopup(topH, rowIndex) : null)))));
}
const styles = StyleSheet.create({
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