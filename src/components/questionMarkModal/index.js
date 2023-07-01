import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, SafeAreaView, Image } from 'react-native';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import theme from '../../theme/resources';

function QuestionMarkModal({ isVisible, handleClose }) {
    const { top } = useSafeAreaInsets();
    console.log("top", top)
    return (

        <Modal
            supportedOrientations={['landscape', 'portrait', 'landscape-right', 'landscape-left', 'portrait-upside-down']}
            visible={isVisible}
            onDismiss={handleClose}
            // transparent={true}
            style={{
                // paddingHorizontal: 20,
                padding: 20,
                margin: 0,
                backgroundColor: "black",
                // height: 100,
                paddingBottom: 0,
                marginTop: top,
            }}
        >

            <View style={{ flex: 1, marginTop: top, paddingHorizontal: 12 }}>
                <View style={{ position: 'relative', height: 40 }}>
                    <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', right: 10, top: 10 }} activeOpacity={0.9}>
                        <Image source={require('../../assets/images/closeIcon.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>What is a Systematic Form?</Text>
                    <View style={{ marginTop: 16 }}>
                        <Text style={{ color: theme.gray }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Text>
                    </View>
                </View>

            </View>
        </Modal>

    )
}

export default QuestionMarkModal;