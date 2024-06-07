import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {useStore} from '../store/store';
import OrderItems from '../components/OrderItems';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const OrderHistoryScreen = () => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const buttonPressHandler = () => {};
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        style={[{marginBottom: tabBarHeight}]}
        showsVerticalScrollIndicator={false}>
        <HeaderBar title="Order History" />
        <View style={styles.OrdersContainer}>
          {OrderHistoryList.map((order: any) => {
            return (
              <OrderItems
                date={order.OrderDate}
                orderList={order.CartList}
                totalPrice={order.CartListPrice}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.ButtonContainer}
          onPress={buttonPressHandler}>
          <Text style={styles.ButtonTitle}>Download</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  OrdersContainer: {
    paddingHorizontal: SPACING.space_30,
    flexDirection: 'column',
    gap: SPACING.space_20,
  },
  ButtonTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  ButtonContainer: {
    marginTop: SPACING.space_20,
    marginHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryOrangeHex,
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
});
export default OrderHistoryScreen;
