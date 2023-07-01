import { Formik } from 'formik';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Button, } from 'react-native-paper';
import TextInputComponent from '../../components/input';
import Logo from '../../components/logo';
import { forgotPasswordValidationSchema } from '../../utils/formvalidation';
import theme from '../../theme/resources';
import Heading from '../../components/heading'
import { useDispatch } from 'react-redux';
import { forgotUserPassword } from '../../redux/actions';
import BackIcon from '../../assets/images/backIcon.png';
import { goBack } from '../../services/NavigationService';
import StringsOfLanguages from '../../utils/localization';


function ForgotScreen() {
    const dispatch = useDispatch();
    const onSubmit = (values) => {
        const { email } = values;
        console.log('hiii values forgot', values)
        dispatch(forgotUserPassword(values));
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', paddingLeft: 10, paddingVertical: 40, alignItems: 'center' }}>
                <TouchableOpacity style={{}} onPress={goBack} activeOpacity={0.9}>
                    <Image source={BackIcon} resizeMode="contain" style={{ height: 32, width: 32 }} />
                </TouchableOpacity>
                <Logo />
            </View>

            <View style={{ alignItems: 'center', }}>
                <Heading title="Forgot Your Password" textStyle={{ fontSize: 16, color: theme.TextBlack, fontWeight: '600' }} />
                <Text style={{ color: theme.textGrey, textAlign: 'center', width: '80%' }}>
                    {StringsOfLanguages.forgotHeading}
                </Text>
            </View>
            <Formik
                validationSchema={forgotPasswordValidationSchema}
                initialValues={{ email: '', }}
                onSubmit={onSubmit}>
                {({ handleSubmit, isValid, dirty, errors, touched, handleChange, handleBlur, values }) => {
                    return (
                        <View style={{ paddingHorizontal: 20, marginTop: '6%', flex: 1 }}>
                            <View>
                                <View>
                                    <TextInputComponent
                                        placeholder={StringsOfLanguages.email}
                                        returnKeyType="next"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        error={errors.email && touched.email}
                                        errorText={errors.email}
                                        autoCapitalize="none"
                                        autoCompleteType="email"
                                        textContentType="emailAddress"
                                        keyboardType="email-address"
                                    />
                                </View>

                            </View>

                            <View style={{ alignItems: 'center', marginTop: '6%' }}>
                                <Button mode="contained" textStyle={{ lineHeight: 18, }} style={{ width: 200, height: 40, backgroundColor: theme.Primary }} onPress={handleSubmit}>{StringsOfLanguages.submit}</Button>
                            </View>
                        </View>
                    )
                }}
            </Formik>
        </View>

    )
}

export default ForgotScreen;