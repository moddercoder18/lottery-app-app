import { StyleSheet } from 'react-native';
import theme from '../../theme/resources';

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginTop: 24
    },
    btnSection: {
        alignItems: 'center',
        marginTop: 5
    },
    btnText: {
        color: theme.TextBlack,
        fontSize: 12,
    },
    btn: {
        borderWidth: 1,
        borderColor: theme.TextBlack
    },
    forgotPassword: {
        marginTop: 8,
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    forgot: {
        fontSize: 14,
        color: theme.Primary,
        textDecorationLine: 'underline',
        fontWeight: '600'
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