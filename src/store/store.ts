import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    () => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      CartList: [],
      FavoriteList: [],
      OrderHistoryList: [],
    }),
    {
      name: 'Coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
