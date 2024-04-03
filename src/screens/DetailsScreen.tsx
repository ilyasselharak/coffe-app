import React from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useStore} from '../store/store';
import {COLORS} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const DetailsScreen = ({navigation, route}: any) => {
  const itemOfIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  const backHandler = () => {
    navigation.pop();
  };
  const addToFavorite = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavorite = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavorite = (favorite: boolean, type: string, id: string) => {
    favorite ? addToFavorite(type, id) : deleteFromFavorite(type, id);
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
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default DetailsScreen;
