import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import OrderItem from './OrderItem';

interface OrderItemsProps {
  orderList: any[];
  date: string;
  totalPrice: string;
}
const OrderItems: React.FC<OrderItemsProps> = ({
  orderList,
  date,
  totalPrice,
}) => {
  return (
    <View style={styles.OrderItemContainer}>
      <View style={styles.OrderInfoRow}>
        <View style={styles.OrderDateContainer}>
          <Text style={styles.OrderTitle}>Order Date</Text>
          <Text style={styles.OrderDate}>{date}</Text>
        </View>
        <View style={styles.OrderTotalContainer}>
          <Text style={styles.OrderTitle}>Total Amount</Text>
          <Text style={styles.OrderTotalPrice}>$ {totalPrice}</Text>
        </View>
      </View>
      <View style={styles.OrderContainer}>
        {orderList.map((orderItem: any) => (
          <OrderItem
            special_ingredient={orderItem.special_ingredient}
            prices={orderItem.prices}
            name={orderItem.name}
            imagelink_square={orderItem.imagelink_square}
          />
        ))}
      </View>
    </View>
  );
};

export default OrderItems;

const styles = StyleSheet.create({
  OrderContainer: {
    flexDirection: 'column',
    gap: SPACING.space_16,
    marginTop: SPACING.space_4,
  },
  OrderItemContainer: {
    flex: 1,
  },
  OrderDateContainer: {
    alignItems: 'flex-start',
  },
  OrderTotalPrice: {
    color: COLORS.primaryOrangeHex,
  },
  OrderDate: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryLightGreyHex,
  },
  OrderTotalContainer: {
    alignItems: 'flex-end',
  },
  OrderTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
  },
  OrderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
