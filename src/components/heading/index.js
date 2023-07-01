import React from 'react';
import theme from '../../theme/resources';
import { Text, View, StyleSheet } from 'react-native';

function Heading({ title, textStyle, viewStyle, ...restProps }) {
    return (
        <View style={[{ paddingVertical: '2%', }, viewStyle]}>
            <Text style={[styles.heading, textStyle]}{...restProps}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '400',
        color: theme.TextBlack
    },
})

export default Heading;