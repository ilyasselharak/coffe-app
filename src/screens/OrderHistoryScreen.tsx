import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {useStore} from '../store/store';

const OrderHistoryScreen = () => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  console.log(OrderHistoryList);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar title="Order History" />
      </ScrollView>
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
