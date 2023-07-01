import { StyleSheet } from 'react-native';
import theme from '../../theme/resources';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
        position: 'relative',
        //   borderWidth:4
    },
    input: {
        backgroundColor: theme.White,
        backgroundColor: theme.White,
        padding: 0,
        height: 40,
        paddingLeft: 10,
        fontSize: 14,
        borderWidth: 1.2,
        borderRadius: 4,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        color: theme.TextBlack
    },
    description: {
        fontSize: 11,
        color: theme.TextBlack,
        paddingTop: 8,
    },
    error: {
        fontSize: 11,
        color: theme.Red,
        paddingTop: 8,
    },
});

export default styles;