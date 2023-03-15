import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, TextInput, Text, View, Image, StyleSheet, Platform } from 'react-native';

const InputFiled = (props) => {
    const {
        value,
        rowHeights,
        rowIndex,
        cellIndex,
        placeholder,
        keyboardType,
        onFocus,
        onFocusOut,
        textAlignCenter,
        disabled = false,
        cellData,
        needToCaptureColumnWidths = false,
        setRowHeights,
        columnMaxTextCounts = [],
        setColumnMaxTextCounts,
        columnCount,
        contentEditable,
        hasValuesToRow,
        rowId
    } = props;

    const [width, setWidth] = useState(0);

    useEffect(() => {

        if (value && width) {
            const valueWidth = (value.length * 8);
            const numberOfLineBreaks = (value.match(/\n/g) || []).length;
            const newHeight = (Math.ceil(valueWidth / width) * 16) + (numberOfLineBreaks * 16);

            if (
                !rowHeights[rowIndex] ||
                (rowHeights?.[rowIndex]?.value && rowHeights[rowIndex].value < newHeight) ||
                ((rowHeights?.[rowIndex]?.cellIndex === 0 || rowHeights[rowIndex].cellIndex) && rowHeights[rowIndex].cellIndex === cellIndex)) {
                const newArray = rowHeights;
                newArray[rowIndex] = { value: newHeight, cellIndex: cellIndex };
                setRowHeights(newArray);
            }
        } else if (!rowHeights[rowIndex] || (rowHeights[rowIndex] && !hasValuesToRow)) {
            const newArray = rowHeights;
            newArray[rowIndex] = { value: 16, cellIndex: cellIndex };
            setRowHeights(newArray);
        } 
    }, [value, width]);

    useEffect(() => {

        if (value && columnMaxTextCounts[cellIndex] && needToCaptureColumnWidths) {
            const textSize = value.length;
            if (
                // eslint-disable-next-line no-mixed-operators
                textSize >= 10 &&
                // eslint-disable-next-line no-mixed-operators
                (columnMaxTextCounts?.[cellIndex]?.value && columnMaxTextCounts[cellIndex].value < textSize) ||
                ((columnMaxTextCounts?.[cellIndex]?.rowIndex === 0 || columnMaxTextCounts[cellIndex].rowIndex) && columnMaxTextCounts[cellIndex].rowIndex === rowIndex)
            ) {
                const newArray = columnMaxTextCounts;
                newArray[cellIndex] = { value: textSize, rowIndex };
                setColumnMaxTextCounts(newArray);
            }

        } else if (!columnMaxTextCounts[cellIndex] && needToCaptureColumnWidths) {
            const newArray = columnMaxTextCounts;
            newArray[cellIndex] = { value: value?.length > 10 ? value.length : 10, rowIndex };
            setColumnMaxTextCounts(newArray);
        }
    }, [value]);

    return (
        <SafeAreaView pointerEvents={disabled ? "none" : "auto"}>
            <TextInput
                style={[ styles.textPrimeSmCustom,
                    {
                    overflow: rowHeights?.[rowIndex]?.value && rowHeights?.[rowIndex]?.value > 16 ? 'visible' : 'hidden',
                    width: '100%',
                    textAlignVertical: "top",
                    minHeight: 16,
                    padding: 10,
                    ...Platform.select({
                        web: {
                            height: (rowHeights?.[rowIndex]?.value || 16) + (contentEditable && columnCount > 4 ? 30 : 20),
                        },
                        android: {
                            height: (rowHeights?.[rowIndex]?.value || 16) + (contentEditable && columnCount > 4 ? 30 : 20),
                        }
                    }),
                    textAlign: textAlignCenter ? "center" : "auto",
                },
                ]}
                multiline={true}
                editable={!disabled}
                onChangeText={(e) => { props.onChangeText(e, rowIndex, cellIndex, rowId) }}
                value={value || ""}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onFocus={onFocus ? () => onFocus() : () => { }}
                onBlur={() => onFocusOut(cellData, rowIndex, cellIndex, rowId)}
                onContentSizeChange={e => {
                    setWidth(e.nativeEvent.contentSize.width);
                }}
            />
        </SafeAreaView>
    );
};

const TextViewer = (props) => {

    return (
        <Text>
            {props.text}
        </Text>
    );
};

const ClickableCell = (props) => {
    const { onselectAnswer, cellData, rowIndex, cellIndex, enableAnswerTrigger, selectIconUrl, rowId } = props;

    const pressCell = () => {
        onselectAnswer(rowIndex, cellIndex, cellData, !cellData.selected, rowId);
    }

    return (
        <TouchableOpacity onPress={() => pressCell()} disabled={!enableAnswerTrigger} >
            {
                cellData.selected ? (
                    
                    <View style={[styles.flexRowJcCtAiCt]}>
                        <Image
                            source={selectIconUrl}
                            style={styles.blueAnswerTick}
                        />
                    </View>


                ) : (
                        <InputFiled {...props} disabled={true} />
                )
            }
        </TouchableOpacity>
    )
};


export {
    InputFiled,
    TextViewer,
    ClickableCell
};

const styles = StyleSheet.create({
    flexRowJcCtAiCt: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 10
    },
    blueAnswerTick: {
        height: 14,
        width: 18
    },
    textPrimeSmCustom: {
        fontFamily:"Asap",
        fontSize: 12,
        color:'#404041',
        fontWeight: '500',
      },
});