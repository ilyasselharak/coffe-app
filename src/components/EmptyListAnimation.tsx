import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
interface EmptyListAnimationProp {
  title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProp> = ({title}) => {
  return (
    <View style={styles.EmptyCardContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  );
};

export default EmptyListAnimation;

const styles = StyleSheet.create({
  LottieStyle: {height: 300},
  LottieText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_medium,
  },
  EmptyCardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
