import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import Search from "../screens/search";
import Home from "../screens/lotteryList";
import ForgotScreen from '../screens/forgotPassword';
import { HomeTabs } from './BottomNavigation';
import RegisterScreen from '../screens/regitser';
import LotteryDetails from '../screens/lotteryDetails';
import EditProfileScreen from '../screens/editUserProfile';
import Paypal from '../components/paypal';
import UserProfile from '../screens/userProfile';
import LanguageScreen from '../screens/language';
import StaticPage from '../screens/staticPage'
import TicketsScreens from '../screens/tickets';
import ResultScreen from '../screens/result';
import MyWalletScreen from '../screens/mywallet';
import ResultDetailsScreen from '../screens/result/details';
import ChangePasswordScreen from '../screens/changePassword';
import TicketDetailsScreen from '../screens/tickets/ticketDetails';


const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();


export const Auth = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen name="login" component={LoginScreen} />
            <AuthStack.Screen name="register" component={RegisterScreen} />
            <AuthStack.Screen name="forgot" component={ForgotScreen} />
        </AuthStack.Navigator>
    )
}

export const Main = () => {
    return (
        <MainStack.Navigator
            initialRouteName="HomeTabs"
            screenOptions={{
                headerShown: false,
            }}>
            <MainStack.Screen name="login" component={LoginScreen} />
            <MainStack.Screen name="HomeTabs" component={HomeTabs} />
            <MainStack.Screen name="register" component={RegisterScreen} />
            <MainStack.Screen name="forgot" component={ForgotScreen} />
            <MainStack.Screen name="search" component={Search} />
            <MainStack.Screen name="home" component={Home} />
            <MainStack.Screen name="lotteryDetails" component={LotteryDetails} />
            <MainStack.Screen name="editProfile" component={EditProfileScreen} />
            <MainStack.Screen name="paypal" component={Paypal} />
            <MainStack.Screen name="userProfile" component={UserProfile} />
            <MainStack.Screen name="language" component={LanguageScreen} />
            <MainStack.Screen name="staticPage" component={StaticPage} />
            <MainStack.Screen name="history" component={TicketsScreens} />
            <MainStack.Screen name="result" component={ResultScreen} />
            <MainStack.Screen name="myWallet" component={MyWalletScreen} />
            <MainStack.Screen name="resultDetails" component={ResultDetailsScreen} />
            <MainStack.Screen name="changePassword" component={ChangePasswordScreen} />
            <MainStack.Screen name="ticketDetails" component={TicketDetailsScreen} />
        </MainStack.Navigator>
    )
}