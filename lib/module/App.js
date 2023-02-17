import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
export default function App(props) {
  const [result, setResult] = React.useState();
  React.useEffect(() => {
    setResult(props.name);
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, null, "Result: ", result));
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20
  }
});
//# sourceMappingURL=App.js.map