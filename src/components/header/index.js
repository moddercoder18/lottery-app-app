import React from 'react';
import { Appbar, Text, } from 'react-native-paper';
import { Image, View } from 'react-native';

// import Logo from '../../assets/images/logo.png';
import Logo from '../../assets/images/logoLottery.png';
import closet from '../../assets/images/search.png';
import theme from '../../theme/resources';
import { goBack, navigate } from '../../services/NavigationService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackIcon from '../../assets/images/backIcon.png'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/actions'
import { deviceWidth } from '../../utils/device';




function Header({ isLogout = false, isBack = true, showSearch = false, isLogo = true }) {
    const dispatch = useDispatch();

    function handleLogout() {
        console.log("hiii logout")
        dispatch(userLogout())
    }

    function handleShopNow() {
        // navigate('shopNow')
    }

    return (
        <Appbar.Header style={{ backgroundColor: theme.White, alignItems: 'center', width: deviceWidth, justifyContent: 'space-between' }} >
            <TouchableOpacity onPress={goBack} activeOpacity={0.9} dispatch={!isBack}>
                {isBack && <Image source={BackIcon} resizeMode="contain" style={{ height: 32, width: 32 }} />}
            </TouchableOpacity>
            {isLogo &&
                <View style={{ alignItems: 'center', marginLeft: 5, justifyContent: 'center', alignSelf: 'center' }}>
                    <Image source={Logo} height={50} resizeMode="contain" style={{ width: 200, height: 50, alignItems: 'center' }} />
                </View>
            }
            <TouchableOpacity onPress={handleLogout} dispatch={!isLogout}>
                {isLogout &&
                    <Text onPress={handleLogout} style={{ fontSize: 18, color: theme.Red, right: 4, }}>Log out</Text>}
            </TouchableOpacity>
        </Appbar.Header>)
}


export default Header;
