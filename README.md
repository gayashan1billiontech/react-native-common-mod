# react-native-common-modules

test module

## Installation

```sh
npm install react-native-common-modules
```

## Usage

```js
import  { DynamicTable }  from 'react-native-common-modules';

// ...
<DynamicTable 
    tableData = {[{rowId: "",rowType:"",questionSelectionType:"", columns:[]},{rowId: "",rowType:"",questionSelectionType:"",columns:[]}]}
    columnCount={"number"}
    columnWidthsTemplate={{ firstColumn: `${100 / columnCount }%`, otherColumns: `${100 / columnCount}%`, mergedColumns: `${100 - (100 / columnCount)}%`, fullColumn: '100%`'}}
    defaultColumnType={"DEFAULT"}
    cellHook={{ ["rowType"]: (data, elementRef) => {  /* logic */} }}
    onPressRow={"function"}
    renderPopup={"function"}
    showPopup={"boolean"}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

