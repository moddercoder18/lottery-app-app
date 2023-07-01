import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, } from 'react-native'
import FastImage from 'react-native-fast-image';
// import { TextInput as Input } from 'react-native-paper';
import theme from '../../theme/resources';
import DropDown from "react-native-paper-dropdown";
import styles from './styles';


export default function SelectInputComponent({ showDropDown, handleshowDropDown, handleToggleIcon, isIconToggle, onBlur, inputStyle, errorText, description, mode, isIcon, value, ...props }) {
    console.log("value", value)
    const [isFocus, setIsFocus] = useState(false)
    return (
        <View style={styles.container}>
            <DropDown
                mode={mode ? mode : "flat"}
                visible={showDropDown}
                showDropDown={handleshowDropDown}
                onDismiss={handleshowDropDown}
                // dropDownContainerHeight={40}
                // dropDownContainerMaxHeight={40}
                placeholder={props.label}
                underlineColor="transparent"
                placeholderTextColor={theme.gray}
                activeColor={theme.Black}
                value={value}
                // label={value}
                inputProps={{ style: [styles.input, {}], }}
                {...props}
            />
            {/* <TextInput
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
            /> */}

            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}