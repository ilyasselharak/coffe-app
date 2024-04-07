import {
  Image,
  ImageSourcePropType,
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
import LinearGradient from 'react-native-linear-gradient';

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageSourcePropType;
  roasted: string;
  prices: any;
  special_ingredient: string;
  type: string;
  incrementCartItemQuantityHandler: (id: string, size: string) => void;
  decrrementCartItemQuantityHandler: (id: string, size: string) => void;
  calculatePrice: () => void;
}

const CardItem: React.FC<CartItemProps> = ({
  id,
  calculatePrice,
  name,
  imagelink_square,
  roasted,
  prices,
  special_ingredient,
  type,
  incrementCartItemQuantityHandler,
  decrrementCartItemQuantityHandler,
}) => {
  return (
    <View style={styles.CartContainer}>
      {prices?.length !== 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradientContainer}>
          <View style={styles.CartItemRow}>
            <Image source={imagelink_square} style={styles.ImageSm} />
            <View style={styles.CartInfoContainer}>
              <View>
                <Text style={styles.CartItemTitle}>{name}</Text>
                <Text style={styles.CartItemIngredient}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.CartRoastedContainer}>
                <Text style={styles.CartRoastedTitle}>{roasted}</Text>
              </View>
            </View>
          </View>
          <View style={styles.CartPricesContainer}>
            {prices.map((price: any) => (
              <View style={styles.CartPriceRow} key={price.size}>
                <View style={styles.CartSizeContainerSm}>
                  <Text style={styles.CartSizeTitle}>{price.size}</Text>
                </View>
                <View style={styles.CartPrice}>
                  <Text style={styles.CartPriceCurrency}>{price.currency}</Text>
                  <Text style={styles.CartPriceTitle}>{price.price}</Text>
                </View>
                <View style={styles.SizeActionContainer}>
                  <TouchableOpacity
                    style={styles.CartActionSize}
                    onPress={() => {
                      decrrementCartItemQuantityHandler(id, price.size);
                      calculatePrice();
                    }}>
                    <Text style={styles.ActionButtonText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.QuantityContainer}>
                    <Text style={styles.QuantityText}>{price.quantity}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.CartActionSize}
                    onPress={() => {
                      incrementCartItemQuantityHandler(id, price.size);
                      calculatePrice();
                    }}>
                    <Text style={styles.ActionButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradientContainer}>
          <View style={styles.CartItemRow}>
            <Image source={imagelink_square} style={styles.ImageLg} />
            <View style={styles.CartInfoContainer}>
              <View>
                <Text style={styles.CartItemTitle}>{name}</Text>
                <Text style={styles.CartItemIngredient}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.PriceRow}>
                <View style={styles.CartSizeContainerLg}>
                  <Text style={styles.CartSizeTitle}>{prices[0].size}</Text>
                </View>
                <View style={styles.CartPrice}>
                  <Text style={styles.CartPriceCurrency}>
                    {prices[0].currency}
                  </Text>
                  <Text style={styles.CartPriceTitle}>{prices[0].price}</Text>
                </View>
              </View>
              <View style={styles.SizeActionContainer}>
                <TouchableOpacity
                  style={styles.CartActionSize}
                  onPress={() => {
                    decrrementCartItemQuantityHandler(id, prices[0].size);
                    calculatePrice();
                  }}>
                  <Text style={styles.ActionButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.QuantityContainer}>
                  <Text style={styles.QuantityText}>{prices[0].quantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.CartActionSize}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, prices[0].size);
                    calculatePrice();
                  }}>
                  <Text style={styles.ActionButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CartContainer: {},
  PriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ImageLg: {
    width: 165,
    height: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  QuantityText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  QuantityContainer: {
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    width: 55,
    paddingVertical: 1,
    paddingTop: 6,
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
  },
  SizeActionContainer: {
    flexDirection: 'row',
    gap: SPACING.space_20,
  },
  ActionButtonText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  CartActionSize: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingTop: 6,
    width: SPACING.space_36,
  },
  CartPrice: {
    flexDirection: 'row',
    gap: SPACING.space_4,
  },
  CartPriceTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  CartPriceCurrency: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  CartPricesContainer: {
    gap: SPACING.space_10,
  },
  CartSizeTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  CartPriceRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  CartSizeContainerLg: {
    backgroundColor: COLORS.primaryBlackRGBA,
    width: 84,
    height: SPACING.space_36,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CartSizeContainerSm: {
    backgroundColor: COLORS.primaryBlackRGBA,
    width: 72,
    height: SPACING.space_36,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  CartInfoContainer: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  LinearGradientContainer: {
    flex: 1,
    gap: SPACING.space_20,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CartRoastedTitle: {
    color: COLORS.secondaryLightGreyHex,
  },
  CartRoastedContainer: {
    backgroundColor: COLORS.primaryBlackRGBA,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    borderRadius: BORDERRADIUS.radius_15,
  },
  CartItemIngredient: {
    color: COLORS.secondaryLightGreyHex,
  },
  CartItemTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_extralight,
    fontSize: FONTSIZE.size_24,
  },
  ItemFirstRow: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
  },
  CartItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1,
  },
  ImageSm: {
    width: 130,
    height: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
});

export default CardItem;
