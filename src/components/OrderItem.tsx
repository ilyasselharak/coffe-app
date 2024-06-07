import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

interface OrderItemProps {
  name: string;
  imagelink_square: ImageSourcePropType;
  prices: any;
  special_ingredient: string;
}
const OrderItem: React.FC<OrderItemProps> = ({
  name,
  imagelink_square,
  prices,
  special_ingredient,
}) => {
  return (
    <View style={styles.OrderItemContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientContainer}>
        <View style={styles.OrderItemRowContainer}>
          <View style={styles.OrderItemRow}>
            <Image source={imagelink_square} style={styles.OrderItemImage} />
            <View>
              <Text style={styles.OrderItemName}>{name}</Text>
              <Text style={styles.OrderItemIngredient}>
                {special_ingredient}
              </Text>
            </View>
          </View>
          <Text style={styles.OrderItemPriceContainer}>
            $ <Text style={styles.OrderItemPrice}>56.54</Text>
          </Text>
        </View>
        <View style={styles.OrderSizesContainer}>
          {prices.map((price: any) => (
            <View style={styles.OrderItemSizesContainer}>
              <View style={styles.OrderItemSizePrice}>
                <Text style={styles.OrderSize}>{price.size}</Text>
                <Text style={styles.OrderPriceContainer}>
                  $ <Text style={styles.OrderPrice}>{price.price}</Text>
                </Text>
              </View>
              <Text style={styles.OrderQuantityContainer}>
                X <Text style={styles.OrderQuantity}>{price.quantity}</Text>
              </Text>
              <Text style={styles.OrderTotalPrice}>
                {price.quantity * price.price}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  OrderSizesContainer: {
    flexDirection: 'column',
    gap: SPACING.space_8,
    marginTop: SPACING.space_15,
  },

  OrderQuantityContainer: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  OrderTotalPrice: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
  },

  OrderQuantity: {
    color: COLORS.primaryWhiteHex,
  },
  OrderItemSizesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  OrderPrice: {
    color: COLORS.primaryWhiteHex,
  },
  OrderPriceContainer: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopRightRadius: BORDERRADIUS.radius_10,
    borderBottomRightRadius: BORDERRADIUS.radius_10,
  },
  OrderSize: {
    fontFamily: FONTFAMILY.poppins_semibold,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    color: COLORS.primaryWhiteHex,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_10,
    borderBottomLeftRadius: BORDERRADIUS.radius_10,
  },
  OrderItemSizePrice: {
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
  },
  OrderItemContainer: {
    flex: 1,
  },
  OrderItemIngredient: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_10,
  },
  OrderItemPriceContainer: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  OrderItemPrice: {
    color: COLORS.primaryWhiteHex,
  },
  OrderItemRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  OrderItemName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
  },
  OrderItemImage: {
    width: 57,
    height: 57,
    borderRadius: BORDERRADIUS.radius_15,
  },
  OrderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_15,
  },
  LinearGradientContainer: {
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15,
  },
});
