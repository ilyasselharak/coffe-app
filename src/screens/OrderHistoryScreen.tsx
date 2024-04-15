import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';

const OrderHistoryScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
});
export default OrderHistoryScreen;
