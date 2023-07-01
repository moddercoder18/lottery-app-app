import React from 'react';
import { Avatar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import theme from '../../theme/resources';


function ProfileImage({ size = 120, imageUrl }) {

    return (
        <FastImage style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 0.8, borderColor: theme.Primary }} source={{ uri: imageUrl }} />
    )
}

export default ProfileImage;