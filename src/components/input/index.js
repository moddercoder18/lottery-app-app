import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, } from 'react-native'
import FastImage from 'react-native-fast-image';
// import { TextInput as Input } from 'react-native-paper';
import theme from '../../theme/resources';
import styles from './styles';


export default function TextInputComponent({ handleToggleIcon, isIconToggle, onBlur, inputStyle, errorText, description, mode, isIcon, isInstSocailIcon, isFbSocailIcon, isSnapSocailIcon, ...props }) {
    const [isFocus, setIsFocus] = useState(false)
    return (
        <View style={styles.container}>
            <TextInput
                onFocus={() => setIsFocus(true)}
                style={[styles.input, inputStyle, { borderColor: isFocus ? theme.Primary : theme.TextBlack }]}
                selectionColor={theme.TextBlack}
                onBlur={() => {
                    onBlur,
                        setIsFocus(false)
                }}
                underlineColor="transparent"
                placeholderTextColor={theme.gray}
                mode={mode ? mode : "outlined"}
                placeholder={props.label}
                {...props}
            />
            {/* {isIcon &&
        <TouchableOpacity onPress={handleToggleIcon} style={{ position: 'absolute', right: 8, alignItems: 'center', height: 40, justifyContent: 'center' }}>
          {isIconToggle && <FastImage source={require('../../assets/images/eye.png')} style={{ width: 20, height: 14 }} resizeMode="contain" />}
          {!isIconToggle && <FastImage source={require('../../assets/images/eyeOff.png')} style={{ width: 20, height: 14 }} resizeMode="contain" />}
        </TouchableOpacity>
      } */}


            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}