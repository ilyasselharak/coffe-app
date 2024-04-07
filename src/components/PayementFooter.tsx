import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface PriceProps {
  price: string;
  currency: string;
}
interface PayementFooterProps {
  price: PriceProps;
  buttonPressHandler: () => void;
  buttonTitle: string;
}

const PayementFooter: React.FC<PayementFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
          {price.currency}
          <Text style={styles.Price}> {price.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.ButtonContainer}
        onPress={buttonPressHandler}>
        <Text style={styles.ButtonTitle}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
    padding: SPACING.space_20,
  },
  ButtonTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
  },
  ButtonContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PriceContainer: {
    alignItems: 'center',
    width: 100,
  },
  Price: {
    color: COLORS.primaryWhiteHex,
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
});

export default PayementFooter;
