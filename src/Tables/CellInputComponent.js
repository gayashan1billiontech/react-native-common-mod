
import React from 'react';
import { InputFiled } from './Fields';

const CellInputComponent = React.forwardRef((props, ref) => {


    return (
        <InputFiled
        {...props}
            placeholder={props.placeholder}
            keyboardType={'default'} 
            ref={ref}
            />

    )

});

export default CellInputComponent;
