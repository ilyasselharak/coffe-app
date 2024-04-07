import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {Text} from 'react-native';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};
const HomeScreen = ({navigation}: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const categories = getCategoriesFromData(CoffeeList);

  const [search, setSearch] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories?.[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );
  const ListRef: any = useRef<FlatList>();
  const tabBarHight = useBottomTabBarHeight();
  const searchCoffee = (searchText: string) => {
    if (searchText !== '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLocaleLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };
  const resetSearch = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearch('');
  };
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const addToCardHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is added to card`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar />
        <Text style={styles.ScreenTitle}>
          Find the best{'\n'}coffee for you
        </Text>
        <View style={styles.SearchContainer}>
          <TouchableOpacity
            onPress={() => {
              searchCoffee(search);
            }}>
            <CustomIcon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                search.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find Your Coffee..."
            value={search}
            onChangeText={text => setSearch(text)}
            style={{...styles.SearchField}}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
          {search.length ? (
            <TouchableOpacity onPress={() => resetSearch()}>
              <CustomIcon
                style={styles.InputClose}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategorieScrollViewStyle}>
          {categories.map((category, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  setCategoryIndex({index: index, category: category});
                  setSortedCoffee([...getCoffeeList(category, CoffeeList)]);
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }}>
                <Text
                  style={[
                    styles.category,
                    categoryIndex.index === index
                      ? {color: COLORS.primaryOrangeHex}
                      : {},
                  ]}>
                  {category}
                </Text>
                {categoryIndex.index === index ? (
                  <View style={styles.ActiveCategorie} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <FlatList
          ref={ListRef}
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          horizontal
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }>
              <CoffeeCard
                name={item.name}
                id={item.id}
                imagelink_square={item.imagelink_square}
                average_rating={item.average_rating}
                buttonPressHandler={addToCardHandler}
                index={item.index}
                price={item.prices[2]}
                roasted={item.roasted}
                special_ingredient={item.special_ingredient}
                type={item.type}
              />
            </TouchableOpacity>
          )}
        />
        <Text style={styles.BeansTitle}>Coffee Beans</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={BeanList}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                })
              }>
              <CoffeeCard
                name={item.name}
                id={item.id}
                imagelink_square={item.imagelink_square}
                average_rating={item.average_rating}
                buttonPressHandler={addToCardHandler}
                index={item.index}
                price={item.prices[2]}
                roasted={item.roasted}
                special_ingredient={item.special_ingredient}
                type={item.type}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  CategoryText: {},
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    paddingVertical: SPACING.space_36 * 3.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
  },
  InputClose: {
    marginHorizontal: SPACING.space_20,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  CategorieScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  category: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
  ActiveCategorie: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  SearchContainer: {
    margin: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
  },
  SearchField: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
  ScreenTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
});
export default HomeScreen;
