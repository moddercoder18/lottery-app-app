import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ActionSheet from '../../components/actionsheet';
import Header from '../../components/header';
import TextInputComponent from '../../components/input';
import ProfileImage from '../../components/profileImage';
import { deleteUser, uploadProfilePicture } from '../../redux/actions';
import theme from '../../theme/resources';
import { nonInfluencerValidationSchema, profileValidationSchema } from '../../utils/formvalidation';
import { AUTH_KEYS, hydrate } from '../../utils/storage';
import { showErrorMessage } from '../../utils/toast';
import styles from './styles';
import StringsOfLanguages from '../../utils/localization';
import PhoneInput from '../../components/PhoneInput';
import { navigate } from '../../services/NavigationService';
import SelectInputComponent from '../../components/select';

const CANCEL_INDEX = 0
const DESTRUCTIVE_INDEX = 3
const options = ['Cancel', 'Camera', 'Gallery']
const title = 'Select to upload picture'
const message = ''

function EditProfileScreen() {
    const [height, setHeight] = useState(undefined);
    const userDetails = useSelector(state => state.user.userData);
    const actionSheet = useRef('')
    const phoneInput = useRef(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [value, setValue] = useState("");
    const settingCountry = useSelector(state => state.setting.settingData)
    var token;

    const dispatch = useDispatch();
    const onSubmit = values => {
        const { userName, country } = values;
        console.log('values', values);
        let userData = {
            ...userDetails,
            name: userName,
            country,
        };

        dispatch(updateUser(userData));
    };


    const uploadProfileImage = () => {
        actionSheet.current.show();
    };
    // console.log('userDetails editProfile', userDetails);

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are Your sure you want to delete this account?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel button is clicked') },
                {
                    text: 'OK', onPress: () => {
                        console.log('OK button clicked')
                        dispatch(deleteUser())
                    }
                },
            ],
            {
                cancelable: false
            }
        );
    }

    const handlePress = (index) => {
        console.log("index>>>", index)
        handleProfileUpload(index)

    }

    const handleProfileUpload = (index) => {
        if (index == 1) {
            ImagePicker.openCamera({
                width: 120,
                height: 120,
                cropping: true,
                quality: 0.2,
                compressImageQuality: 0.2,
                cropperCircleOverlay: true,
                freeStyleCropEnabled: true,
            }).then((image) => {
                try {
                    const data = new FormData();
                    const newUrl = 'file:///' + (image.sourceURL.replace('file://', ''));
                    const file = {
                        uri: newUrl,
                        name: `${new Date().getTime()}.${image.mime.split('/')[1]}`,
                        type: image.mime,
                    };
                    data.append('file', file);
                    dispatch(uploadProfilePicture(data,))
                    console.log(image);
                } catch (err) {
                    console.log('error', err)
                }
            }).catch((err) => {
                console.log("error", err);
                showErrorMessage(err.message)
            });

        } else if (index == 2) {
            ImagePicker.openPicker({
                width: 120,
                height: 120,
                cropping: true,
                quality: 0.2,
                compressImageQuality: 0.2,
                cropperCircleOverlay: true,
                freeStyleCropEnabled: true,
            }).then((image) => {
                try {
                    const data = new FormData();
                    const newUrl = 'file:///' + (image.sourceURL.replace('file://', ''));
                    const file = {
                        uri: newUrl,
                        name: `${new Date().getTime()}.${image.mime.split('/')[1]}`,
                        type: image.mime,
                    };
                    data.append('file', file);
                    dispatch(uploadProfilePicture(data, token))
                    console.log(image);
                } catch (err) {
                    console.log('error', err)
                }
            }).catch((err) => {
                console.log("error", err.message, err);
                showErrorMessage(err.message)
            });
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <Header isLogout={true} isBack={true} />

            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={uploadProfileImage} activeOpacity={0.9}>
                    <ProfileImage imageUrl={userDetails?.profilePicture} />
                </TouchableOpacity>
                <View style={styles.btnSection}>
                    <Button
                        mode="outlined"
                        textStyle={styles.btnText}
                        style={styles.btn}
                        onPress={uploadProfileImage}>
                        {StringsOfLanguages.chooseImage}
                    </Button>
                </View>
            </View>
            <View style={{ marginTop: '4%', flex: 1 }}>
                <Formik
                    validationSchema={profileValidationSchema}
                    initialValues={{
                        userName: userDetails?.name || '',
                        phoneNo: userDetails?.phoneNo || '',
                        country: userDetails?.country || ''
                    }}
                    enableReinitialize
                    onSubmit={onSubmit}>
                    {({
                        handleSubmit,
                        isValid,
                        dirty,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        values,
                    }) => {
                        return (
                            <View style={{ flex: 1, paddingBottom: 20 }}>
                                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <View>
                                            <TextInputComponent
                                                title={StringsOfLanguages.userName}
                                                placeholder={StringsOfLanguages.userName}
                                                returnKeyType="next"
                                                value={values.userName}
                                                onChangeText={handleChange('userName')}
                                                onBlur={handleBlur('userName')}
                                                error={errors.userName && touched.userName}
                                                errorText={errors.userName}
                                                autoCapitalize="none"
                                            />
                                        </View>
                                        <View>
                                            {/* <TextInputComponent
                                                title={StringsOfLanguages.phoneNumber}
                                                placeholder={StringsOfLanguages.phoneNumber}
                                                returnKeyType="next"
                                                value={values.phoneNo}
                                                onChangeText={handleChange('phoneNo')}
                                                onBlur={handleBlur('phoneNo')}
                                                error={errors.phoneNo && touched.phoneNo}
                                                errorText={errors.phoneNo}
                                                autoCapitalize="none"
                                            /> */}
                                            {/* <PhoneInput
                                                ref={phoneInput}
                                                defaultValue={values.phoneNo}
                                                defaultCode="US"
                                                layout="second"
                                                onChangeText={handleChange('phoneNo')}

                                                textInputStyle={styles.textInputStyle}
                                                containerStyle={styles.phoneInput}
                                                // flagButtonStyle={{ borderWidth: 1 }}
                                                textContainerStyle={{ backgroundColor: '#fff' }}
                                                withDarkTheme
                                                withShadow
                                                autoFocus

                                            /> */}
                                        </View>

                                        <View>

                                            <SelectInputComponent
                                                placeholder={StringsOfLanguages.country}
                                                returnKeyType="next"
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

                                        <View style={styles.forgotPassword}>
                                            <TouchableOpacity
                                                onPress={() => navigate('changePassword')} activeOpacity={0.9}>
                                                <Text style={styles.forgot}>{StringsOfLanguages.changePassword}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={handleDeleteAccount} activeOpacity={0.9}>
                                                <Text style={[styles.forgot, { paddingTop: 20, color: theme.Red }]}>{StringsOfLanguages.deleteAccount}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                                <Button mode="contained" onPress={handleSubmit} style={{ width: '80%', alignSelf: 'center' }}>
                                    {StringsOfLanguages.saveChanges}
                                </Button>
                            </View>
                        );
                    }}
                </Formik>
            </View>
            <ActionSheet
                ref={actionSheet}
                title={title}
                message={message}
                options={options}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={DESTRUCTIVE_INDEX}
                onPress={handlePress}
            />
        </View>
    );
}

export default EditProfileScreen;
