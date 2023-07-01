import React, {Fragment, useEffect, useState} from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';
import {BottomTabIcon} from './BottomTabIcon';
import {View, Text} from 'react-native';

import Profile from '../screens/profile';
import Search from '../screens/search';
import Home from '../screens/lotteryList';
import theme from '../theme/resources';
import ResultScreen from '../screens/result';
import Paypal from '../components/paypal';
import {useRoute} from '@react-navigation/native';
const screenOptions = ({route, navigation}) => ({
  tabBarShowLabel: false,
  tabBarItemStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarStyle: {
    elevation: 4,
    shadowColor: theme.TextBlack,
    shadowOffset: {width: 0, height: -1}, // change this for more shadow
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  tabBarIcon: ({focused}) => {
    // console.log("route",route.name)
    //   const iconName = getKeyValue(IconRouteMap)(route.name);
    return <BottomTabIcon icon={route.name} isActive={focused} />;
  },
});

const HomeTab = createBottomTabNavigator();

export const HomeTabs = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(null);
  const route = useRoute();
  useEffect(() => {
    if (route?.params?.transactionPayload) {
      setShowPaymentModal(route?.params?.transactionPayload);
    }
  }, [route?.params?.transactionPayload]);
  console.log('======================', showPaymentModal);
  return (
    <>
      <HomeTab.Navigator screenOptions={screenOptions}>
        <HomeTab.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <HomeTab.Screen
          name="ticket"
          component={ResultScreen}
          options={{headerShown: false}}
        />
        <HomeTab.Screen
          name="profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </HomeTab.Navigator>
      {!!showPaymentModal && (
        <Paypal
          isVisible={!!showPaymentModal}
          onClose={() => {
            setShowPaymentModal(null);
          }}
          transactionData={showPaymentModal}
        />
      )}
    </>
  );
};
