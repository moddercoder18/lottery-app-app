import React from 'react';
import { View, Text } from 'react-native';
import theme from '../../theme/resources';
import styles from './styles';

function Divider() {
    return (
        <View style={styles.topContainer}>
            <View style={styles.leftLight} />
        </View>
    )
}

export default Divider;