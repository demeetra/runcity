import {PlatformPressable} from '@react-navigation/elements';
import * as React from 'react';
import {Image, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

export const Hamburger = () => {
  const navigation = useNavigation();
  const route = useRoute();

  if (route.name === 'Profile' || route.name === 'Login') {
    // TODO: X button
    return null;
  }

  return (
    <PlatformPressable
      accessible
      accessibilityRole="button"
      android_ripple={{borderless: true}}
      onPress={() => navigation.navigate('Profile')}
      style={styles.touchable}
      hitSlop={Platform.select({
        ios: undefined,
        default: {top: 16, right: 16, bottom: 16, left: 16},
      })}>
      <Image
        style={[styles.icon]}
        source={require('@react-navigation/drawer/src/views/assets/toggle-drawer-icon.png')}
        fadeDuration={0}
      />
    </PlatformPressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    margin: 3,
    resizeMode: 'contain',
  },
  touchable: {
    marginHorizontal: 11,
  },
});
