export const calculateColumnWidths = (columnWidths, windowWidth, columnCount, firstRowTextCheck) => {
  const _columnWidths = {
    ...columnWidths
  };
  _columnWidths.firstColumn = `${100 / columnCount}%`;
  _columnWidths.otherColumns = `${100 / columnCount}%`;
  _columnWidths.mergedColumns = `${100 - 100 / columnCount}%`;
  _columnWidths.fullColumn = `${100}%`;
  console.log('_columnWidths', _columnWidths);
  return _columnWidths;
};
//# sourceMappingURL=DynamicTableHandler.js.map