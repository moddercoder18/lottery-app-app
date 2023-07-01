import React from "react";
import { Image, View } from 'react-native';
import styles from './styles';
// import LogoImage from '../../assets/images/logo.png';
import LogoImage from '../../assets/images/logoLottery.png';


function Logo() {
    return (
        <View style={styles.topContainer}>
            <Image source={LogoImage} resizeMode="contain" style={{ height: 80, }} />
        </View>
    )
}




export default Logo;