import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {useStore} from '../store/store';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const FavoritesScreen = () => {
  const favoriteList = useStore((state: any) => state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const removefromFavorite = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView style={{marginBottom: tabBarHeight}}>
        <HeaderBar title="Favorites" />
        <View style={styles.FavoritesContainer}>
          {favoriteList.map((item: any) => (
            <View key={item.id}>
              <ImageBackgroundInfo
                ToggleFavourite={() => {
                  removefromFavorite(item.type, item.id);
                }}
                imageLink_portrait={item.imagelink_portrait}
                favorite={item.favourite}
                title={item.name}
                average_rating={item.average_rating}
                id={item.id}
                roasted={item.roasted}
                type={item.type}
                ratings_count={item.ratings_count}
                special_ingredient={item.special_ingredient}
                ingredients={item.ingredients}
              />
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={styles.LinearGradientContainer}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                <View style={styles.DescriptionContainer}>
                  <Text style={styles.DescriptionStyle}>Description</Text>
                  <Text numberOfLines={3} style={styles.Description}>
                    {item.description}
                  </Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  DescriptionContainer: {
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_4,
  },
  Description: {
    color: COLORS.primaryWhiteHex,
  },
  DescriptionStyle: {
    color: COLORS.secondaryLightGreyHex,
  },
  LinearGradientContainer: {
    borderBottomLeftRadius: BORDERRADIUS.radius_15,
    borderBottomRightRadius: BORDERRADIUS.radius_15,
    flex: 1,
    gap: SPACING.space_20,
    padding: SPACING.space_12,
  },
  FavoritesContainer: {
    flex: 1,
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_12,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
});
export default FavoritesScreen;
