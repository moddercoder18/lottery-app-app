import React, { useState } from "react";
import LoginScreen from "../login";
import { useDispatch, useSelector } from 'react-redux';
import EditProfileScreen from '../editUserProfile';
import UserProfile from '../userProfile';
import { View, Text, TouchableOpacity } from 'react-native';
import MainContainer from '../../components/mainContainer';
import { List, Card, Button } from 'react-native-paper';
import theme from "../../theme/resources";
import Header from '../../components/header';
import { navigate } from "../../services/NavigationService";
import { deviceWidth } from "../../utils/device";
import ProfileImage from '../../components/profileImage';
import { userLogout } from "../../redux/actions";
import StringsOfLanguages from "../../utils/localization";
function Profile() {
    const userDetails = useSelector(state => state.user.userData);
    const isLoggedIn = useSelector(state => state?.user?.isLoggedIn);
    const dispatch = useDispatch()
    // console.log("userDetails Profile", userDetails)
    // const [isUserLoging, setIsUserLoging] = useState(true)
    console.log("isLoggedIn>?>?>?>?", isLoggedIn, userDetails)

    const handleLogout = () => {
        dispatch(userLogout());
    }

    return (
        <MainContainer>
            <Header isBack={false} showSearch={false} />
            <View style={{ height: '30%', alignItems: 'center', justifyContent: 'center' }}>
                {!isLoggedIn && <>
                    <View style={{ alignItems: 'center' }}>
                        <Button
                            mode="contained"
                            style={{
                                width: 300,
                                height: 40,
                                backgroundColor: theme.Primary,
                            }}
                            onPress={() => navigate('login')}>
                            {StringsOfLanguages.logIn}
                        </Button>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Button
                            mode="outlined"
                            textColor={theme.Primary}
                            style={{
                                width: 300,
                                height: 40,
                                borderWidth: 1,
                                borderColor: theme.TextBlack,
                                color: theme.Primary,
                                fontSize: 14,
                            }}
                            onPress={() => navigate('register')}>
                            {StringsOfLanguages.createAccoun}
                        </Button>
                    </View>
                </>}
                {isLoggedIn &&
                    <View>
                        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                            <ProfileImage imageUrl={userDetails?.profilePicture} size={100} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth - 50 }}>

                            <Text style={{ fontSize: 16, fontWeight: '600', color: theme.TextBlack, width: '80%', borderWidth: 1 }}>{userDetails?.email}</Text>
                            <TouchableOpacity onPress={handleLogout} activeOpacity={0.9}>
                                <Text style={{ fontSize: 16, color: theme.Red, fontWeight: '600' }}> {StringsOfLanguages.logout}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
            <Card style={{ height: '55%', marginHorizontal: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingHorizontal: 10 }}>
                {isLoggedIn && <>
                    <List.Item
                        title={StringsOfLanguages.myAccount}
                        onPress={() => navigate('userProfile')}
                        style={{ borderBottomWidth: 1, borderBottomColor: theme.gray, marginTop: 10 }}
                        titleStyle={{ color: theme.TextBlack, fontSize: 18, }}
                        right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline" />}
                    />
                    <List.Item
                        title={StringsOfLanguages.myWallet}
                        onPress={() => navigate('myWallet')}
                        style={{ borderBottomWidth: 1, borderBottomColor: theme.gray, marginTop: 10 }}
                        titleStyle={{ color: theme.TextBlack, fontSize: 18, }}
                        right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline" />}
                    />
                    <List.Item
                        title={StringsOfLanguages.ticketsTitle}
                        onPress={() => navigate('history')}
                        style={{ borderBottomWidth: 1, borderBottomColor: theme.gray, marginTop: 5 }}
                        titleStyle={{ color: theme.TextBlack, fontSize: 18, }}
                        right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline" />}
                    />
                </>}
                <List.Item
                    title={StringsOfLanguages.languageTitle}
                    onPress={() => navigate('language')}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.gray, marginTop: 5 }}
                    titleStyle={{ color: theme.TextBlack, fontSize: 18, }}
                    right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline" />}
                />

                <List.Item
                    title={StringsOfLanguages.aboutTitle}
                    onPress={() => navigate('staticPage', {
                        slug: 'about-us'
                    })}
                    style={{ borderBottomWidth: 1, borderBottomColor: theme.gray, marginTop: 5 }}
                    titleStyle={{ color: theme.TextBlack, fontSize: 18, }}
                    right={props => <List.Icon {...props} icon="arrow-right-drop-circle-outline" />}
                />

            </Card>

        </MainContainer>
    )
}

export default Profile;