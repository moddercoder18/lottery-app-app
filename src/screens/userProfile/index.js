import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import Header from '../../components/header';
import ProfileImage from '../../components/profileImage';
import TextInputComponent from '../../components/input';
import { deviceWidth } from "../../utils/device";
import theme from "../../theme/resources";
import { navigate } from "../../services/NavigationService";
import StringsOfLanguages from '../../utils/localization';

function UserProfile() {
    const userDetails = useSelector(state => state.user.userData);
    console.log("userDetails", userDetails)
    return (
        <View style={{ flex: 1 }}>
            <Header isLogout={true} isBack={true} />
            <View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <ProfileImage imageUrl={'https://picsum.photos/200'} size={100} />
                </View>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <View style={{}}>
                        <Text style={{ paddingLeft: 4, color: theme.TextBlack }}>{StringsOfLanguages.userName}:</Text>
                        <TextInputComponent
                            title="Name"
                            placeholder="Name"
                            returnKeyType="next"
                            value={userDetails?.name || ''}
                            editable={false}
                        />
                    </View>
                    <View style={{}}>
                        <Text style={{ paddingLeft: 4, color: theme.TextBlack }}>{StringsOfLanguages.email}:</Text>
                        <TextInputComponent
                            title="Email"
                            placeholder="e-mail"
                            value={userDetails?.email || ''}
                            editable={false}
                        />
                    </View>
                    <View style={{}}>
                        <Text style={{ paddingLeft: 4, color: theme.TextBlack }}>{StringsOfLanguages.phoneNumber}:</Text>
                        <TextInputComponent
                            title="Phone number"
                            placeholder="phone"
                            value={userDetails?.phoneNo || ''}
                            editable={false}
                        />
                    </View>
                    <View style={{}}>
                        <Text style={{ paddingLeft: 4, color: theme.TextBlack }}>{StringsOfLanguages.country}:</Text>
                        <TextInputComponent
                            title="Country"
                            placeholder="country"
                            value={userDetails?.country || ''}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('editProfile')} style={{ width: deviceWidth - 20, borderWidth: 1, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 90, backgroundColor: theme.Primary, borderColor: theme.Primary }}>
                        <Text style={{ color: theme.White }}>{StringsOfLanguages.editProfile}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default UserProfile;