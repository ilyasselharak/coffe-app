import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import {StyleSheet} from 'react-native';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';

const TabNavigator = () => {
  const BottomTab = [
    {id: 1, title: 'Home', icon: 'home', renderComponent: HomeScreen},
    {id: 2, title: 'Cart', icon: 'cart', renderComponent: CartScreen},
    {id: 3, title: 'Favorite', icon: 'like', renderComponent: FavoritesScreen},
    {
      id: 4,
      title: 'History',
      icon: 'bell',
      renderComponent: OrderHistoryScreen,
    },
  ];
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={25}
            style={styles.BlurViewStyles}
          />
        ),
      }}>
      {BottomTab.map(tab => (
        <Tab.Screen
          key={tab.id}
          name={tab.title}
          component={tab.renderComponent}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => (
              <CustomIcon
                name={tab.icon}
                size={25}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
export default TabNavigator;
