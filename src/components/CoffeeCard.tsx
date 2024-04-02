import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {ImageSourcePropType} from 'react-native';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';
interface CoffeeCardProps {
  name: string;
  id: string;
  type: string;
  rested: string;
  average_rating: number;
  buttonPressHandler: any;
  special_ingredient: string;
  imagelink_square: ImageSourcePropType;
  price: {price: number; size: string; currency: string};
  index: number;
}
const CARD_WIDTH = Dimensions.get('window').width * 0.32;
const CoffeeCard: React.FC<CoffeeCardProps> = ({
  name,
  id,
  imagelink_square,
  average_rating,
  buttonPressHandler,
  index,
  price,
  rested,
  special_ingredient,
  type,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryDarkGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={imagelink_square}
        style={styles.CardImageBG}
        resizeMode="cover">
        <View style={styles.ContentOverlay}>
          <CustomIcon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubTitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceContainer}>
          $<Text style={styles.CardPrice}>{price?.price}</Text>
          <TouchableOpacity>
            <BGIcon
              color={COLORS.primaryWhiteHex}
              name="add"
              BGColor={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_10}
            />
          </TouchableOpacity>
        </Text>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  ContentOverlay: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    right: 0,
    top: 0,
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
  },
  CardPrice: {},
  CardPriceContainer: {},
  CardSubTitle: {},
  CardTitle: {},
  CardFooterRow: {},
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    lineHeight: 22,
  },
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
});
