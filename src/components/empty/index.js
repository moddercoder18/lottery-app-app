import React from 'react';
import { Image, View, Text } from 'react-native';
import { deviceHeight, deviceWidth } from '../../utils/device';
import emptyIcon from '../../assets/images/empty-folder.png'
import theme from '../../theme/resources';


function EmptyComponent() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: deviceWidth, }}>
                    <Image source={emptyIcon} style={{ height: deviceHeight / 2, width: deviceWidth / 2, }} resizeMode="contain" />
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: deviceHeight / 1.2, width: deviceWidth, position: 'absolute' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: theme.TextBlack, width: deviceWidth / 1.6, textAlign: 'center' }}> No Data found </Text>
            </View>

        </View>
    )
}

export default EmptyComponent;