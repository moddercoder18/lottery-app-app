import React, { useState } from 'react';
import { View } from 'react-native';

import { Formik } from 'formik';
import TextInputComponent from '../../components/input';
import { TextInput as Input } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { changePasswordValidationSchema } from '../../utils/formvalidation';
import { changeUserPassword } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/header';



function ChangePasswordScreen() {

    const [eyeView, setEyeView] = useState(true);
    const [newPasswordeyeView, setNewPasswordeyeView] = useState(true);
    const [confirmEyeView, setConfirmEyeView] = useState(true);
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        const { oldPassword, newPassword } = values;
        dispatch(changeUserPassword({ oldPassword, newPassword }))

    }
    return (
        <View style={{ flex: 1 }}>
            <Header isLogout={false} isBack={true} />
            <View style={{ marginTop: '8%', flex: 1 }}>
                <Formik
                    validationSchema={changePasswordValidationSchema}
                    initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '', }}
                    onSubmit={onSubmit}>
                    {({ handleSubmit, isValid, dirty, errors, touched, handleChange, handleBlur, values }) => {
                        return (
                            <View style={{ flex: 1, }}>
                                <View style={{ paddingHorizontal: 20, }}>
                                    <View>
                                        <TextInputComponent
                                            title="Current Password"
                                            placeholder="Current Password"
                                            returnKeyType="next"
                                            onChangeText={handleChange('oldPassword')}
                                            onBlur={handleBlur('oldPassword')}
                                            error={errors.oldPassword && touched.oldPassword}
                                            errorText={errors.oldPassword}
                                            autoCapitalize="none"
                                            secureTextEntry={eyeView}
                                            isIcon={true}
                                            isIconToggle={eyeView}
                                            handleToggleIcon={() => setEyeView(!eyeView)}
                                        // right={<Input.Icon icon={eyeView ? "eye" : 'eye-off'} onPress={() => setEyeView(!eyeView)} />}
                                        />
                                    </View>
                                    <View>
                                        <TextInputComponent
                                            title="New Password"
                                            placeholder="New Password"
                                            returnKeyType="next"
                                            onChangeText={handleChange('newPassword')}
                                            onBlur={handleBlur('newPassword')}
                                            error={errors.newPassword && touched.newPassword}
                                            errorText={errors.newPassword}
                                            autoCapitalize="none"
                                            secureTextEntry={newPasswordeyeView}
                                            isIcon={true}
                                            isIconToggle={newPasswordeyeView}
                                            handleToggleIcon={() => setNewPasswordeyeView(!newPasswordeyeView)}
                                        // right={<Input.Icon icon={newPasswordeyeView ? "eye" : 'eye-off'} onPress={() => setNewPasswordeyeView(!eyeView)} />}
                                        />
                                    </View>
                                    <View>
                                        <TextInputComponent
                                            title="Confirm Password"
                                            placeholder="Confirm Password"
                                            returnKeyType="next"
                                            onChangeText={handleChange('confirmNewPassword')}
                                            onBlur={handleBlur('confirmNewPassword')}
                                            error={errors.confirmNewPassword && touched.confirmNewPassword}
                                            errorText={errors.confirmNewPassword}
                                            autoCapitalize="none"
                                            secureTextEntry={confirmEyeView}
                                            isIcon={true}
                                            isIconToggle={confirmEyeView}
                                            handleToggleIcon={() => setConfirmEyeView(!confirmEyeView)}
                                        // right={<Input.Icon icon={confirmEyeView ? "eye" : 'eye-off'} onPress={() => setConfirmEyeView(!confirmEyeView)} />}
                                        />
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', width: '100%', bottom: 40, position: 'absolute' }}>
                                    <Button mode="contained" onPress={handleSubmit}>Confirm Password</Button>
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </View>
        </View>
    )
}

export default ChangePasswordScreen;