import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {COLORS, SPACING} from '../theme/theme';
import {StatusBar} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CardItem from '../components/CardItem';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PayementFooter from '../components/PayementFooter';
import {Text} from 'react-native';

const CartScreen = ({navigation}: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const clearData = useStore((state: any) => state.clearCartList);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const incrementCartQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const handleDecreaseQuantity = (id: string, size: string) => {
    decrementCartQuantity(id, size);
    calculateCartPrice();
  };
  const handleIncreaseQuantity = (id: string, size: string) => {
    incrementCartQuantity(id, size);
    calculateCartPrice();
  };
  const tabBarHight = useBottomTabBarHeight();
  const buttonPressHandler = () => {
    navigation.push('Payment');
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[{...styles.ScrollViewInnerView, marginBottom: tabBarHight}]}>
          <View style={styles.HeaderContainer}>
            <HeaderBar title="Cart" />
            {CartList.length === 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <CardItem
                      id={data.id}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      prices={data.prices}
                      roasted={data.roasted}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      decrrementCartItemQuantityHandler={handleDecreaseQuantity}
                      incrementCartItemQuantityHandler={handleIncreaseQuantity}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {CartList.length ? (
            <PayementFooter
              buttonPressHandler={buttonPressHandler}
              price={{price: CartPrice, currency: '$'}}
              buttonTitle="Pay"
            />
          ) : (
            <></>
          )}
          <Pressable onPress={() => clearData()}>
            <Text style={styles.Clear}>clear</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  Clear: {
    color: COLORS.primaryOrangeHex,
  },
  ScrollViewContainer: {},
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
  HeaderContainer: {
    flex: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ScrollViewFlex: {flexGrow: 1},
  LinearGradientBG: {
    flex: 1,
  },
  ItemsContainer: {
    gap: SPACING.space_20,
    marginHorizontal: SPACING.space_16,
  },
  ItemContainer: {
    backgroundColor: COLORS.primaryBlackRGBA,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
});
export default CartScreen;
