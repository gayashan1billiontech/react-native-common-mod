import React, { useMemo, useRef } from 'react';
import { Animated, Image, PanResponder, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let layoutDimentions = {};

export const Bubble = (props) => {
  const { text, setInvisibleCount, bubbleStyles, focus, removeBubble, bubbleCount } = props;
  const translateX = useRef(new Animated.Value(0)).current;
  // let location = useRef(0).current;
  let panResponder = useMemo(() => {
    let location = 0;
    translateX.setValue(0);
    return PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        location = translateX._value;
        translateX.setValue(location);
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx } = gestureState;
        translateX.setValue(dx + location);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { vx, dx } = gestureState;
        if (location + dx > 0) {
          location = 0;
          Animated.spring(translateX, {
            toValue: location,
            bounciness: 10,
            useNativeDriver: false
          }).start();
        } else if (Math.abs(location + dx) + (layoutDimentions[text]?.scroll ?? 0) > (layoutDimentions[text]?.text ?? 0)) {
          location = (layoutDimentions[text]?.scroll ?? 0) - (layoutDimentions[text]?.text ?? 0);
          Animated.spring(translateX, {
            toValue: location,
            bounciness: 10,
            useNativeDriver: false
          }).start();
        } else {
          const freeFall = dx > 0 ? dx * vx : -Math.abs(dx * vx);
          if (dx > 0 && location + dx + freeFall > 0) {
            location = 0;
            Animated.spring(translateX, {
              toValue: location,
              bounciness: 10,
              useNativeDriver: false
            }).start(() => (location = translateX._value));
          } else if (dx < 0 && Math.abs(location + dx + freeFall) + (layoutDimentions[text]?.scroll ?? 0) > (layoutDimentions[text]?.text ?? 0)) {
            location = (layoutDimentions[text]?.scroll ?? 0) - (layoutDimentions[text]?.text ?? 0);
            Animated.spring(translateX, {
              toValue: location,
              bounciness: 10,
              useNativeDriver: false
            }).start(() => (location = translateX._value));
          } else {
            location = location + dx + freeFall;
            Animated.spring(translateX, {
              toValue: location,
              friction: 10,
              useNativeDriver: false
            }).start(() => (location = translateX._value));
          }
        }
      }
    });
    //eslint-disable-next-line
  }, [focus, text]);

  return (
    <View onLayout={(e) => setInvisibleCount({ [text]: e.nativeEvent.layout })} style={[style.container, bubbleStyles, !focus && bubbleCount === 1 && { maxWidth: '70%' }]}>
      {focus ? (
        <View style={style.textView}>
          <Text style={style.textUnfocus} allowFontScaling={false}>
            {text}
          </Text>
        </View>
      ) : (
        <View style={{ maxWidth: '100%' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            onLayout={(e) => {
              layoutDimentions = {
                ...layoutDimentions,
                [text]: {
                  ...layoutDimentions[text],
                  scroll: e.nativeEvent.layout.width
                }
              };
            }}
          >
            <Animated.View style={{ transform: [{ translateX: translateX }] }} {...panResponder.panHandlers}>
              <Text
                style={style.textUnfocus}
                selectable={false}
                onLayout={(e) => {
                  layoutDimentions = {
                    ...layoutDimentions,
                    [text]: {
                      ...layoutDimentions[text],
                      text: e.nativeEvent.layout.width
                    }
                  };
                }}
                allowFontScaling={false}
              >
                {text}
              </Text>
            </Animated.View>
          </ScrollView>
        </View>
      )}
      {focus && (
        <View style={style.deleteIcon}>
          <TouchableOpacity onPress={() => removeBubble(text)}>
            <Image source={require('../assets/CloseNew.png')} style={style.deleteIconSize} resizeMode={'contain'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderColor: '#3271C6',
    borderRadius: 22,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 5,
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    maxWidth: '100%',
    backgroundColor: '#F6FAFF',
    flexDirection: 'row'
  },
  textView: {
    paddingRight: 20,
    maxWidth: '100%'
  },
  textUnfocus: {
    color: '#3271C6',
    fontFamily: Platform.OS === 'ios' || Platform.OS === 'android' ? 'Asap' : 'Asap, sans-serif',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  deleteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  deleteIconSize: {
    width: 13,
    height: 13
  }
});
