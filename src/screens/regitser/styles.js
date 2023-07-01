import { StyleSheet } from 'react-native';
import theme from '../../theme/resources';

const styles = StyleSheet.create({
    btn: { width: 240, height: 40, backgroundColor: theme.Primary },
    loginBtnStyle: { width: 200, height: 40, },
    loginBtn: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: theme.TextBlack,
        paddingVertical: 0
    },
    phoneInput: {
        backgroundColor: theme.White,
        backgroundColor: theme.White,
        padding: 0,
        height: 40,
        // paddingLeft: 10,
        // paddingVertical: 10,
        // paddingTop: 10,
        fontSize: 14,
        borderWidth: 1.2,
        borderRadius: 4,
        color: theme.TextBlack,
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center'
    },
    textInputStyle: {
        backgroundColor: theme.White,
        backgroundColor: theme.White,
        // padding: 0,
        height: 35,
        // borderWidth: 1,
        overflow: 'hidden',
        // // paddingLeft: 10,
        // // paddingVertical: 10,
        // // paddingTop: 10,
        // fontSize: 14,
        // borderWidth: 1.2,
        // borderRadius: 4,
        // color: theme.TextBlack,
        width: 20
    }
});

export default styles;