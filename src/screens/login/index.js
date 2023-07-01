import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Logo from '../../components/logo';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Header from '../../components/header';
import { Button, Text } from 'react-native-paper';
import TextInputComponent from '../../components/input';
import { navigate } from '../../services/NavigationService';
import theme from '../../theme/resources';
import { loginValidationSchema } from '../../utils/formvalidation';
import styles from './styles';
import { loginUser } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/mainContainer';
import Paypal from '../../components/paypal';
import { useRoute } from '@react-navigation/native';
import StringsOfLanguages from '../../utils/localization';

function LoginScreen({ navigation }) {
  const route = useRoute();
  console.log("navigation", navigation)//navigation.getParam('transactionPayload')
  const [eyeView, setEyeView] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(loginUser(values, route?.params?.transactionPayload));
    // replace('HomeTabs')
  };

  const handleClose = () => {
    setShowPaymentModal(false)
  }

  console.log("route login ", route?.params?.transactionPayload)
  // if (isLoggedIn) {

  //   if () {

  //   }
  // }
  return (
    <>
      <MainContainer>
        <Header isBack={true} isLogo={true} />

        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Logo />
          </View> */}
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={onSubmit}>
            {({
              handleSubmit,
              isValid,
              dirty,
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
            }) => {
              return (
                <View style={{ paddingHorizontal: 20 }}>
                  <View>
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
                  </View>
                  <View style={styles.forgotPassword}>
                    <TouchableOpacity onPress={() => navigate('forgot')} activeOpacity={0.9}>
                      <Text style={styles.forgot}>{StringsOfLanguages.forgotPassword}?</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Button
                      mode="contained"
                      style={{
                        width: 200,
                        height: 40,
                        backgroundColor: theme.Primary,
                      }}
                      onPress={handleSubmit}>
                      {StringsOfLanguages.logIn}
                    </Button>
                  </View>
                </View>
              );
            }}
          </Formik>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Button
              mode="outlined"
              textColor={theme.Primary}
              style={{
                width: 200,
                height: 40,
                borderWidth: 1,
                borderColor: theme.TextBlack,
                color: theme.Primary,
                fontSize: 14,
              }}
              onPress={() => navigate('register')}>
              Create Account
            </Button>
          </View>
        </View>
      </MainContainer>
      {/* {(showPaymentModal && transactionData) && <Paypal isVisible={showPaymentModal} onClose={handleClose} transactionData={transactionData} />} */}
    </>
  );
}

export default LoginScreen;
