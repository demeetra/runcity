import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {AppTextBold} from './AppTextBold';
import {THEME} from '../../theme';

export const AppButton = props => {
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Wrapper onPress={props.onPress} activeOpacity={0.7}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.button,
          backgroundColor: props.color || THEME.MAIN_COLOR,
          opacity: props.opacity == null ? 1 : props.opacity,
          ...props.style,
        }}>
        <AppTextBold style={styles.text}>{props.children}</AppTextBold>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#FCFCFC',
  },
});
