import React, { useRef, createRef, useState, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions, Platform, ScrollView } from 'react-native';
import { calculateColumnWidths, getBorderColors, getPopupPadding, removeExtraValuesFromMaxTexts } from "./DynamicTableHandler";
import CellInputComponent from './CellInputComponent';
import {
    DEFAULT_ERROR_COLOR,
    DEFAULT_SELECTED_BACKG_COLOR,
    DEFAULT_UN_SELECTED_BACKG_COLOR,
    COMPONENT_TYPE_INPUT,
    COMPONENT_TYPE_SELECT
} from "./constants";

const DynamicTable = (props) => {

    const {
        tableData,
        columnWidthsTemplate = {},
        columnCount,
        cellHook = {},
        defaultColumnType,
        onPressRow = () => { },
        renderPopup,
        showPopup,
        activeBorderColor,
        defaultBorderColor,
        borderWidth,
        focusColor,
        contentEditable,
        popUpHeight,
        values = [],
        onChangeCellValue = (a, b, c) => { },
        onCellFocusOut = () => { },
        onselectAnswer = (a, b, c, d) => { },
        errorRows = [],
        selectIconUrl = "",
        outSideClickEvent = () => { },
        setTableProperties = () => { },
        WidthToIgnoreFromScreen = 0,
        scrollable = false,
        isReadOnly = false
    } = props;

    const { width } = useWindowDimensions();
    const [columnWidths, setColumnWidths] = useState(columnWidthsTemplate);
    const [topHOne, setTopOne] = useState(0);
    const [topTwo, setTopTwo] = useState(0);
    const [topThree, setToThree] = useState(0);
    const [focusedRow, setFocusedRow] = useState(null);
    const [focusedCell, setFocusedCell] = useState(null);
    const [rowHeights, setRowHeights] = useState([]);
    const [elRefs, setElRefs] = useState([]);
    const [columnMaxTextCounts, setColumnMaxTextCounts] = useState([]);
    const anchorRef = useRef(null);

    useEffect(() => {
        const newColumnMaxTextCounts = removeExtraValuesFromMaxTexts(columnCount, columnMaxTextCounts);
        setColumnMaxTextCounts(newColumnMaxTextCounts);
        const newWidths = calculateColumnWidths(columnWidths, width - WidthToIgnoreFromScreen, columnCount, newColumnMaxTextCounts, Platform.OS === 'web' ? true : false);
        setColumnWidths(newWidths);
    }, [width, columnCount, JSON.stringify(columnMaxTextCounts)]);

    useEffect(() => {
        if (!showPopup) {
            setFocusedRow(null);
            setFocusedCell(null);
        }
    }, [showPopup]);

    useEffect(() => {
        setElRefs(tableData.map(() => createRef()),
        );
    }, [tableData]);

    useEffect(() => {
        if (setTableProperties) setTableProperties({ rowHeights, columnWidths })
    }, [rowHeights, columnWidths]);

    useEffect(
        () => {
            function handleClick(event) {

                if (!event || !event.target) return;
                if (!props.outSideClickEvent) return;

                if (anchorRef.current && !anchorRef.current.contains(event.target)) {
                    outSideClickEvent(event);
                }
            }
            if (Platform.OS === 'web') {
                window.addEventListener("click", handleClick);

            }

            return () => {
                if (Platform.OS === 'web') {
                    window.removeEventListener("click", handleClick)
                }
            } 
        }, []);

    const onChangeText = (e, rowIndex, cellIndex, rowId) => {
        if (e % 10 === 0) onFocus(rowIndex, cellIndex);
        onChangeCellValue(e, rowIndex, cellIndex, rowId)
    }


    const onFocus = (rowIndex, cellIndex) => {
        setFocusedRow(rowIndex);
        setFocusedCell(cellIndex);

        const refData = elRefs[rowIndex] || {};
        if (refData?.current?.measureInWindow) {
            // eslint-disable-next-line no-unused-expressions
            refData?.current?.measureInWindow((fx, fy, width, height, px, py) => {
                setTopOne(fy);
            })
        }

        if (anchorRef?.current) {
            anchorRef.current.measureInWindow((x, y, width, height) => {
                setTopTwo(y);
            });
        }

        const refLastData = elRefs[tableData.length - 1] || {};
        if (refLastData?.current) {
            refLastData.current.measureInWindow((x, y, width, height) => {
                setToThree(y);
            });
        }

        onPressRow(rowIndex);
    };

    const getPopUpTopValue = () => {
        const heightForTheRow = topHOne - topTwo;
        const rowHeight = rowHeights?.[focusedRow]?.value || 16;
        return heightForTheRow + rowHeight + 40;
    }

    const element = (params) => (
        <CellInputComponent  {...params} onFocus={(height) => onFocus(params.rowIndex, params.cellIndex, height)} />
    );

    const tableContent = () => {

        return (
            <View ref={anchorRef} style={{ paddingBottom: showPopup && renderPopup ? getPopupPadding(topHOne, topThree, popUpHeight) : 10 }}>
                {
                    tableData.sort((a, b) => a.rowId - b.rowId).map((rowData, rowIndex) => (
                        <View style={[styles.row]} ref={elRefs[rowIndex]}>
                            {
                                rowData.tableColumns.sort((a, b) => a.columnId - b.columnId).map((cellData, cellIndex) => {

                                    const columnType = rowData.questionSelectionType || defaultColumnType;
                                    const cellHookData = cellHook && cellHook[columnType] ? cellHook[columnType]({ rowType: rowData.rowType, cellData, rowIndex, cellIndex, columnWidths }) : {};

                                    const borderColors = getBorderColors(rowIndex, cellIndex, focusedRow, activeBorderColor, defaultBorderColor, borderWidth, errorRows, DEFAULT_ERROR_COLOR);
                                    const focusBackgroundColor = cellIndex === focusedCell && focusedRow === rowIndex ? focusColor : DEFAULT_UN_SELECTED_BACKG_COLOR;

                                    return (
                                        <View key={`${rowIndex}_${cellIndex}`}
                                            style={
                                                [styles.cell,
                                                    { width: cellHookData.width },
                                                { borderBottomColor: borderColors.borderBottomColor },
                                                { borderLeftColor: borderColors.borderLeftColor },
                                                { borderRightColor: borderColors.borderRightColor },
                                                { borderTopColor: borderColors.borderTopColor },
                                                { borderBottomWidth: borderColors.borderBottomWidth },
                                                { borderLeftWidth: borderColors.borderLeftWidth },
                                                { borderRightWidth: borderColors.borderRightWidth },
                                                { borderTopWidth: borderColors.borderTopWidth },
                                                { backgroundColor: cellData.selected ? DEFAULT_SELECTED_BACKG_COLOR : rowData.color ? rowData.color : focusBackgroundColor }
                                                ]}>
                                            {
                                                element(
                                                    {
                                                        placeholder: cellHookData.placeholder,
                                                        rowIndex,
                                                        cellIndex,
                                                        value: values?.[rowData.rowId]?.[cellIndex],
                                                        onChangeText,
                                                        onFocusOut: onCellFocusOut,
                                                        rowHeights,
                                                        setRowHeights,
                                                        textAlignCenter: cellHookData.textAlignCenter,
                                                        type: contentEditable || cellHookData.forceToEnter ? COMPONENT_TYPE_INPUT : COMPONENT_TYPE_SELECT,
                                                        onselectAnswer,
                                                        cellData,
                                                        enableAnswerTrigger: isReadOnly ? false : cellHookData.enableAnswerTrigger,
                                                        disabled: isReadOnly || cellHookData.disabled,
                                                        selectIconUrl,
                                                        needToCaptureColumnWidths: cellHookData.needToCaptureColumnWidths,
                                                        columnMaxTextCounts,
                                                        setColumnMaxTextCounts,
                                                        columnCount,
                                                        contentEditable,
                                                        hasValuesToRow: values?.[rowData.rowId]?.filter(a => a).length ? true : false,
                                                        rowId: rowData.rowId
                                                    }
                                                )
                                            }

                                        </View>

                                    )
                                })
                            }
                        </View>))
                }
                {
                    showPopup && renderPopup ? renderPopup(getPopUpTopValue(), focusedRow) : null
                }
            </View>
        )
    }

    return (
        scrollable ? (
            <ScrollView horizontal>
                {tableData.length ? tableContent() : null}
        </ScrollView>
        ) : tableData.length ? tableContent() : null

    )
}

export default DynamicTable;
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
        justifyContent: 'center',
    },
});