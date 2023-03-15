
import React from 'react';
import { InputFiled, ClickableCell } from './Fields';
import {
    COMPONENT_TYPE_INPUT,
    COMPONENT_TYPE_SELECT
} from "./constants";

const CellInputComponent = (props) => {


    if (props.type === COMPONENT_TYPE_INPUT) {
        return (
            <InputFiled
                {...props}
                placeholder={props.placeholder}
                keyboardType={'default'}

            />

        )
    } else if (props.type === COMPONENT_TYPE_SELECT) {
        return (<ClickableCell {...props} />);
    }

};

export default CellInputComponent;
