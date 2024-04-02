import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from '../theme/theme';

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        style={styles.Image}
        source={require('../assets/app_images/avatar.png')}
      />
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 1,
    borderColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});
