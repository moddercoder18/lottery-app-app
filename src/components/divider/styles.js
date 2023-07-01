import { StyleSheet } from 'react-native';
import theme from '../../theme/resources';
import { deviceWidth } from '../../utils/device'

const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,

    },
    leftLight: {
        borderWidth: 0.6,
        width: deviceWidth - 24,
        marginHorizontal: 10,
        borderColor: theme.textGrey
    },
    rightLight: {
        borderWidth: 0.4,
        width: 80,
        marginLeft: 10,
        borderColor: theme.TextBlack
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '400',
        color: theme.TextBlack
    }
});

export default styles;