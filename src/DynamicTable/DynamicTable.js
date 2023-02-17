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
        onPressRow = () => { },
        renderPopup,
        showPopup
    } = props;

    const { width } = useWindowDimensions();
    const [columnWidths, setColumnWidths] = useState(columnWidthsTemplate);
    const [topH, setTop] = useState(0);
    const [focusedRow, setFocusedRow] = useState(0);
    const elementsRef = useRef(tableData.map(() => createRef()));

    useEffect(() => {
        const newWidths = calculateColumnWidths(columnWidths, width, columnCount);
        setColumnWidths(newWidths);
    }, [width]);


    const onFocus = (rowIndex) => {
        setFocusedRow(rowIndex);

        const refData = elementsRef?.current[rowIndex] || {};
        if (refData?.current?.measureInWindow) {
            const measureInWindow = refData?.current?.measureInWindow;
            measureInWindow((fx, fy, width, height, px, py) => {
                setTop(height)
                onPressRow(rowIndex);
            })
        }
    };

    const element = (placeholder, rowIndex, ref) => (
            <CellInputComponent placeholder={placeholder} onFocus={() => onFocus(rowIndex)} ref={ref} />
    );

    return (
        <View >
            <View style={styles.table}>
                {
                    tableData.map((rowData, rowIndex) => (
                        <View>
                            <View style={styles.row}>
                                {
                                    rowData.columns.map((cellData, cellIndex) => {

                                        const columnType = rowData.questionSelectionType || defaultColumnType;
                                        const cellHookData = cellHook && cellHook[columnType] ? cellHook[columnType]({ rowType: rowData.rowType, cellData, rowIndex, cellIndex, columnWidths }) : {};
                                        const ref = elementsRef?.current[rowIndex];

                                        return (
                                            <View key={`${rowIndex}_${cellIndex}`} style={[styles.cell, { width: cellHookData.width }]}>
                                                {
                                                    rowData.values && rowData.values[cellIndex] ?
                                                        (<Text>{rowData.values[cellIndex]}</Text>)
                                                        : element(cellHookData.placeholder, rowIndex, ref)
                                                }

                                            </View>

                                        )
                                    })
                                }

                            </View>
                            <View>
                                {
                                    focusedRow === rowIndex && showPopup && renderPopup ? renderPopup(topH, rowIndex) : null
                                }
                            </View>
                        </View>))
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    table: {
        margin: 10,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    cell: {
        borderColor: '#3FB4F7',
        borderWidth: 0.5,
        padding: 10,
    },
});