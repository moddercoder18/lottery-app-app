import React from "react";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import HomeIcon from '../assets/images/home.png';
import HomeSelectedIcon from '../assets/images/homeSelected.png';
import ProfileIcon from '../assets/images/profile.png';
import ProfileSelectedIcon from '../assets/images/profileSelected.png';
import TicketIcon from '../assets/images/ticket.png';
import TicketSelectedIcon from '../assets/images/ticketSelected.png';
import theme from "../theme/resources";
import { deviceWidth } from "../utils/device";
export const BottomTabIcon = (props) => {
    const { icon, isActive } = props;
    return (
        <View flex={1} style={{ justifyContent: 'center', }}>
            {icon == 'home' && <View style={styles.iconView} >
                {icon == 'home' && isActive == false && <FastImage source={HomeIcon} color={theme.TextBlack} size={36} style={{ width: 36, height: 36, }} />}
                {icon == 'home' && isActive == true && <FastImage source={HomeSelectedIcon} color={theme.TextBlack} size={36} style={{ width: 36, height: 36, }} />}
            </View>}
            {icon == 'ticket' && <View style={styles.iconView}>
                {icon == 'ticket' && isActive == false && <FastImage source={TicketIcon} color={theme.TextBlack} size={36} style={{ width: 36, height: 36, }} />}
                {icon == 'ticket' && isActive == true && <FastImage source={TicketSelectedIcon} color={theme.TextBlack} size={36} style={{ width: 36, height: 36, }} />}
            </View>}
            {icon == 'profile' && <View style={styles.iconView}>
                {icon == 'profile' && isActive == false && <FastImage source={ProfileIcon} color={theme.TextBlack} size={36} style={{ width: 36, height: 36, }} />}
                {icon == 'profile' && isActive == true && <FastImage source={ProfileSelectedIcon} color={theme.TextBlack} size={36} style={{ width: 36, height: 36, }} />}
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    indicator: {
        height: 26,
        width: 26,
    },
    iconView: {
        width: deviceWidth / 4,
        alignItems: 'center'
    }
});
