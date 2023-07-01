import { Formik } from 'formik';
import React, { useState, useRef } from 'react';
import { ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions';
import TextInputComponent from '../../components/input';
import Logo from '../../components/logo';
import { navigate } from '../../services/NavigationService';
import theme from '../../theme/resources';
import { registerValidationSchema } from '../../utils/formvalidation';
import styles from './styles';
import PhoneInput from '../../components/PhoneInput';
import SelectInputComponent from '../../components/select';
import BackIcon from '../../assets/images/backIcon.png';
import { goBack } from '../../services/NavigationService';
import { countryListFilter } from '../../utils/helper';
import StringsOfLanguages from '../../utils/localization';
import { Checkbox } from 'react-native-paper';
import { showErrorMessage, showWarnMessage } from '../../utils/toast';
import { deviceWidth } from '../../utils/device';
import MainContainer from '../../components/mainContainer';
import Header from '../../components/header';







function RegisterScreen() {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [eyeView, setEyeView] = useState(true);
    const [confirmEyeView, setconfirmEyeView] = useState(true);
    const [checked, setChecked] = useState(false);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const dispatch = useDispatch();
    const [showDropDown, setShowDropDown] = useState(false);
    const settingCountry = useSelector(state => state.setting.settingData)

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    console.log("settingCountry", settingCountry?.countries)

    const onSubmit = (values) => {
        if (checked) {
            const { email, password, userName, country, mobile } = values;
            let data = {
                email,
                password,
                name: userName,
                mobile,
                country: country
            }
            dispatch(registerUser(data))
        } else {
            showErrorMessage('Please accpet the term and condictions')
        }
    }

    return (
        <MainContainer>
            <Header isBack={true} isLogo={true} />
            <ScrollView contentContainerStyle={{ paddingBottom: 90, flex: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {/* <View style={{ flexDirection: 'row', paddingLeft: 10, paddingVertical: 40, width: deviceWidth - 20 }}>
                    <TouchableOpacity style={{ width: '20%', }} onPress={goBack} activeOpacity={0.9}>
                        <Image source={BackIcon} resizeMode="contain" style={{ height: 32, width: 32 }} />
                    </TouchableOpacity>
                    <View style={{ width: '75%', alignItems: 'center' }}>
                        <Logo />
                    </View>
                </View> */}
                <View style={{ alignItems: 'center', paddingVertical: 30, }}>
                    <Text style={{ color: theme.TextBlack, fontSize: 20, fontWeight: '600' }}>Register Your Account</Text>
                </View>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Formik
                        validationSchema={registerValidationSchema}
                        initialValues={{ userName: '', email: '', password: '', confirmPassword: '', mobile: '', country: '' }}
                        onSubmit={onSubmit}>
                        {({ handleSubmit, isValid, dirty, errors, touched, handleChange, handleBlur, values, setValues, setFieldValue }) => {
                            return (
                                <View style={{ paddingHorizontal: 20 }}>
                                    <View>
                                        <View>
                                            <TextInputComponent
                                                placeholder={StringsOfLanguages.fullName}
                                                returnKeyType="next"
                                                onChangeText={handleChange('userName')}
                                                onBlur={handleBlur('userName')}
                                                value={values.userName}
                                                error={errors.userName && touched.userName}
                                                errorText={errors.userName}
                                                autoCapitalize="none"
                                                keyboardType="default"
                                            />
                                        </View>
                                        <View>
                                            <TextInputComponent
                                                placeholder={StringsOfLanguages.emailPaceholder}
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
                                        <View>
                                            <TextInputComponent
                                                placeholder={StringsOfLanguages.password}
                                                returnKeyType="done"
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                error={errors.password && touched.password}
                                                errorText={errors.password}
                                                secureTextEntry={eyeView}
                                                isIcon={true}
                                                isIconToggle={eyeView}
                                                handleToggleIcon={() => setEyeView(!eyeView)}
                                            // right={<Input.Icon icon={eyeView ? "eye" : 'eye-off'} onPress={() => setEyeView(!eyeView)} />}
                                            />
                                        </View>
                                        <View>
                                            <TextInputComponent
                                                placeholder={StringsOfLanguages.comfirmPassword}
                                                returnKeyType="done"
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                value={values.confirmPassword}
                                                error={errors.confirmPassword && touched.confirmPassword}
                                                errorText={errors.confirmPassword}
                                                secureTextEntry={confirmEyeView}
                                                isIcon={true}
                                                isIconToggle={confirmEyeView}
                                                handleToggleIcon={() => setconfirmEyeView(!confirmEyeView)}
                                            />
                                        </View>
                                        <View>
                                            <SelectInputComponent
                                                placeholder={StringsOfLanguages.country}
                                                returnKeyType="next"
                                                // setValue={(_value) => console.log("setValue", _value)}
                                                setValue={(val) => setFieldValue('country', val)}
                                                value={values.country}
                                                error={errors.country && touched.country}
                                                errorText={errors.country}
                                                autoCapitalize="none"
                                                keyboardType="number-pad"
                                                showDropDown={showDropDown}
                                                handleshowDropDown={() => setShowDropDown(!showDropDown)}
                                                list={settingCountry?.countries || []}
                                            />
                                        </View>
                                        <View >
                                            <PhoneInput
                                                ref={phoneInput}
                                                defaultValue={value}
                                                defaultCode="US"
                                                layout="second"
                                                onChangeText={(text) => {
                                                    setValue(text);
                                                }}
                                                onChangeFormattedText={(text) => {
                                                    setFormattedValue(text);
                                                }}
                                                textInputStyle={styles.textInputStyle}
                                                containerStyle={styles.phoneInput}
                                                textContainerStyle={{ backgroundColor: '#fff' }}
                                                withDarkTheme
                                                withShadow
                                                autoFocus

                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <Checkbox.Android
                                                status={checked ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    setChecked(!checked);
                                                }}
                                            />
                                            <Text style={{ fontSize: 16, color: theme.Black }}>I am agree with <Text onPress={() => navigate('staticPage', {
                                                slug: 'terms-of-use'
                                            })} style={{ color: theme.Primary }}>Term & condiction</Text></Text>
                                        </View>

                                    </View>
                                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                                        <Button mode="contained" style={styles.btn} onPress={handleSubmit}>{StringsOfLanguages.signUp}</Button>
                                    </View>
                                </View>
                            )
                        }}
                    </Formik>
                    <View style={{ alignItems: 'center', marginVertical: 14 }}>
                        <View style={{ paddingVertical: 5 }}>
                            <Text style={{ color: theme.TextBlack, marginBottom: 3 }}>{StringsOfLanguages.alreadyAccount}?</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Button textColor={theme.Primary} mode="outlined" textStyle={{ color: theme.TextBlack, fontSize: 14, }} style={styles.loginBtn} onPress={() => navigate('login')}> {StringsOfLanguages.logIn} </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </MainContainer>

    )
}

export default RegisterScreen;