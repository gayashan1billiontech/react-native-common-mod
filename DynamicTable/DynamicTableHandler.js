export const removeExtraValuesFromMaxTexts = (columnCount, columnMaxTextCounts) => {
    const columnMaxTextCountsArrayLength = columnMaxTextCounts.length;

    if (columnCount < columnMaxTextCountsArrayLength) {

        const dif = columnMaxTextCountsArrayLength - columnCount;

        for (let x = 0; x < dif; x++) {
            columnMaxTextCounts.pop();
        }

    }

    return columnMaxTextCounts;
}

export const getTotals = (columnMaxTextCounts, index) => {
    const fullTextCount = columnMaxTextCounts.reduce((accumulator, object, currentIndex) => {

        if (currentIndex >= index) {
            return accumulator + object.value;
        } else {
            return accumulator;
        }

    }, 0);

    return fullTextCount;
}

export const calculateColumnWidths = (columnWidths, windowWidth, columnCount, columnMaxTextCounts, web = false) => {
    const _columnWidths = {};

    if (!columnMaxTextCounts || !columnMaxTextCounts.length) {
        _columnWidths.firstColumn = `${100 / columnCount}%`;
        _columnWidths.otherColumns = `${100 / columnCount}%`;
        _columnWidths.mergedColumns = `${100 - (100 / columnCount)}%`;
        _columnWidths.fullColumn = `${100}%`;
    } else {

        let remPrecentage = 100;
        const firstColumnMinWidth = 33.3333333333;
        const hardFirstColumnMaxWidth = !web ? 60 : 50;


        const fullTextCount = getTotals(columnMaxTextCounts, 0);
        let hardValue = (columnMaxTextCounts?.[0]?.value / fullTextCount) * 100;
        hardValue = hardValue >= hardFirstColumnMaxWidth ? hardFirstColumnMaxWidth : firstColumnMinWidth >= hardValue ? firstColumnMinWidth : hardValue;
        remPrecentage = remPrecentage - hardValue;


        if (!web && windowWidth) {

            const fColumnPX = (windowWidth * hardValue) / 100;
            const refactoredFirstColumnWidthPX = fColumnPX <= 120 ? 120 : fColumnPX;
            const remaining = windowWidth - fColumnPX;
            const othColumnPX = remaining / (columnCount - 1);
            const otherColumnPX = othColumnPX <= 60 ? 60 : othColumnPX;
            const mergedColPX = otherColumnPX * (columnCount - 1);
            const fullColPX = refactoredFirstColumnWidthPX + mergedColPX;

            _columnWidths.firstColumn = refactoredFirstColumnWidthPX;
            _columnWidths.mergedColumns = mergedColPX;
            _columnWidths.fullColumn = fullColPX;
            _columnWidths.otherColumns = otherColumnPX;
            _columnWidths.rotate = (windowWidth / fullColPX) > 1.3 ? true : false;
            _columnWidths.scrollEnable = windowWidth < fullColPX ? true : false;

        } else {
            _columnWidths.firstColumn = `${hardValue}%`;
            _columnWidths.mergedColumns = `${100 - hardValue}%`;
            _columnWidths.fullColumn = `${100}%`;
            _columnWidths.otherColumns = `${remPrecentage / (columnCount - 1)}%`;
        }



        /*
        DYNAMIC WIDTHS FOR EVERY COLUMN 

        const otherColumnsMinWidth = 8;
        const otherColumnsMaxWidth = 25;
        columnMaxTextCounts.map((i, index) => {

            if (index === 0) {
                const fullTextCount = getTotals(columnMaxTextCounts, 0);
                let hardValue = (i.value / fullTextCount) * 100;

                const minOtherColumnTotal = otherColumnsMinWidth * (columnCount - 1);
                const maxFirstColumnVal = remPrecentage - minOtherColumnTotal;
                const maxFirstColumn = maxFirstColumnVal >= hardFirstColumnMaxWidth ? hardFirstColumnMaxWidth : maxFirstColumnVal <= firstColumnMinWidth ? firstColumnMinWidth : maxFirstColumnVal;
                hardValue = hardValue >= maxFirstColumn ? maxFirstColumn : hardValue <= firstColumnMinWidth ? firstColumnMinWidth : hardValue;
                remPrecentage = remPrecentage - hardValue;

                _columnWidths.firstColumn = `${hardValue}%`;
                _columnWidths.mergedColumns = `${100 - hardValue}%`;
                _columnWidths.fullColumn = `${100}%`;
            } else {
                const fullTextCount = getTotals(columnMaxTextCounts, index);
                let hardValue = (i.value / fullTextCount) * remPrecentage;
                const maxOtherColumnVal = remPrecentage - (otherColumnsMinWidth * (columnCount - index));
                const maxOtherColumn = maxOtherColumnVal >= otherColumnsMaxWidth ? otherColumnsMaxWidth : otherColumnsMinWidth >= maxOtherColumnVal ? otherColumnsMinWidth : maxOtherColumnVal;
                hardValue = columnCount - 1 === index && remPrecentage <= otherColumnsMaxWidth ? remPrecentage : hardValue >= maxOtherColumn ? maxOtherColumn : hardValue <= otherColumnsMinWidth ? otherColumnsMinWidth : hardValue;
                _columnWidths[index] = `${hardValue}%`;
                remPrecentage = remPrecentage - hardValue;
            }
        });
        */
    }

    return _columnWidths;


}

export const getBorderColors = (rowIndex, cellIndex, activeRow, activeColor, defaultColor = "None", borderWidth, errorRows = [], errorColor) => {


    const borderColors = {
        borderBottomColor: defaultColor,
        borderLeftColor: defaultColor,
        borderRightColor: defaultColor,
        borderTopColor: defaultColor,
        borderBottomWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderTopWidth: borderWidth
    }

    if (rowIndex > 0) {
        borderColors.borderTopWidth = 0;
    }

    if (cellIndex > 0) {
        borderColors.borderLeftWidth = 0;
    }

    if (errorRows.length && errorRows.includes(rowIndex)) {
        borderColors.borderTopColor = errorColor;
        borderColors.borderBottomColor = errorColor;
        borderColors.borderLeftColor = errorColor;
        borderColors.borderRightColor = errorColor;
    } else if (errorRows.includes(rowIndex + 1)) {
        borderColors.borderBottomColor = errorColor;
    } else if (activeRow === 0 || activeRow) {
        if (rowIndex === activeRow) {
            borderColors.borderTopColor = activeColor;
            borderColors.borderBottomColor = activeColor;
            borderColors.borderLeftColor = activeColor;
            borderColors.borderRightColor = activeColor;
        } else if (rowIndex === activeRow + 1) {
            borderColors.borderTopColor = activeColor;
        } else if (rowIndex === activeRow - 1) {
            borderColors.borderBottomColor = activeColor;
        }
    }
    return borderColors;

}

export const getPopupPadding = (topHOne, setToThree, popupHeight) => {

    let extraSpace = 0;
    const tableHeight = setToThree - topHOne;
    const needExtraHeight = tableHeight > popupHeight ? false : true;

    if (needExtraHeight) {
        extraSpace = (popupHeight - tableHeight) + 10;
    }
    return extraSpace;
}

