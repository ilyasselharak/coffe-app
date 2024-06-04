import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {TouchableWithoutFeedback} from 'react-native';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}: any) => {
  const itemOfIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  const [fullDesc, setFullDesc] = useState(false);
  const [priceSelected, setPriceSelected] = useState(itemOfIndex.prices[0]);
  const addToFavorite = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavorite = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  const backHandler = () => {
    navigation.pop();
  };

  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? deleteFromFavorite(type, id) : addToFavorite(type, id);
  };
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          ToggleFavourite={() =>
            ToggleFavorite(
              itemOfIndex.favourite,
              itemOfIndex.type,
              itemOfIndex.id,
            )
          }
          BackHandler={backHandler}
          enableBackButton
          imageLink_portrait={itemOfIndex.imagelink_portrait}
          favorite={itemOfIndex.favourite}
          title={itemOfIndex.name}
          average_rating={itemOfIndex.average_rating}
          id={itemOfIndex.id}
          roasted={itemOfIndex.roasted}
          type={itemOfIndex.type}
          ratings_count={itemOfIndex.ratings_count}
          special_ingredient={itemOfIndex.special_ingredient}
          ingredients={itemOfIndex.ingredients}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.DescriptionTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.DescriptionTags}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text numberOfLines={3} style={styles.DescriptionTags}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.DescriptionTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {itemOfIndex.prices.map((item: any) => (
              <TouchableOpacity
                style={[
                  styles.SizeContainer,
                  {
                    borderColor:
                      item.size === priceSelected.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}
                onPress={() => setPriceSelected(item)}
                key={item.size}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        itemOfIndex.type === 'bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        item.size === priceSelected.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryLightGreyHex,
                    },
                  ]}>
                  {item.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          buttonTitle="Add to Cart"
          buttonPressHandler={() =>
            addToCartHandler({
              id: itemOfIndex.id,
              index: itemOfIndex.index,
              name: itemOfIndex.name,
              roasted: itemOfIndex.roasted,
              imagelink_square: itemOfIndex.imagelink_square,
              special_ingredient: itemOfIndex.special_ingredient,
              type: itemOfIndex.type,
              price: priceSelected,
            })
          }
          price={priceSelected}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  SizeContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  DescriptionTags: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    letterSpacing: 0.5,
    marginBottom: SPACING.space_10,
  },
  ItemDetails: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_30,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  DescriptionTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    marginBottom: SPACING.space_10,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default DetailsScreen;
