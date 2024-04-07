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
import CustomIcon from './CustomIcon';

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
}

const CardItem: React.FC<CartItemProps> = ({
  id,
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
          {prices.map((data: any, index: any) => (
            <View
              key={index.toString()}
              style={styles.CartItemSizeRowContainer}>
              <View style={styles.CartItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                  <Text
                    style={[
                      styles.CartSizeTitle,
                      {
                        fontSize:
                          type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </View>
                <Text style={styles.CartPriceCurrency}>
                  {data.currency}
                  <Text style={styles.CartPriceTitle}> {data.price}</Text>
                </Text>
              </View>
              <View style={styles.CartItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartActionSize}
                  onPress={() => {
                    decrrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartActionSize}
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
                <View style={styles.SizeBox}>
                  <Text
                    style={[
                      {
                        ...styles.CartSizeTitle,
                        fontSize:
                          type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      },
                    ]}>
                    {prices[0].size}
                  </Text>
                </View>
                <View style={styles.CartPrice}>
                  <Text style={styles.CartPriceCurrency}>
                    {prices[0].currency}

                    <Text style={styles.CartPriceTitle}>
                      {' '}
                      {prices[0].price}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.SizeActionContainer}>
                <TouchableOpacity
                  style={styles.CartActionSize}
                  onPress={() =>
                    decrrementCartItemQuantityHandler(id, prices[0].size)
                  }>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {prices[0].quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartActionSize}
                  onPress={() =>
                    incrementCartItemQuantityHandler(id, prices[0].size)
                  }>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
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
  CartContainer: {flex: 1},
  PriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ImageLg: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  QuantityText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  QuantityContainer: {
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    width: 80,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    width: 80,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  SizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },

  CartActionSize: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.space_12,
    width: SPACING.space_36,
  },
  CartPrice: {
    flexDirection: 'row',
    gap: SPACING.space_4,
  },
  CartPriceTitle: {
    color: COLORS.primaryWhiteHex,
  },
  CartPriceCurrency: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },

  CartSizeTitle: {
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_medium,
  },

  CartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center',
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
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
  },
  CartRoastedContainer: {
    backgroundColor: COLORS.primaryBlackRGBA,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
  },
  CartItemIngredient: {
    color: COLORS.secondaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
  },
  CartItemTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
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
