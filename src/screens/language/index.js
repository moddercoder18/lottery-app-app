import React, { useState, useEffect } from 'react';
import MainContainer from '../../components/mainContainer';
import Header from '../../components/header';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import StringsOfLanguages from '../../utils/localization';
import { Card, RadioButton } from 'react-native-paper';
import theme from '../../theme/resources';
import { deviceWidth } from '../../utils/device';
import { setSelectedLanguage, updateUser } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const languageList = [
    { id: 1, title: 'english', value: 'en', },
    { id: 2, title: 'chinese', value: 'zh', },
    { id: 3, title: 'korean', value: 'ko', },
    { id: 4, title: 'japanese', value: 'ja', },
    { id: 5, title: 'vietnamese', value: 'vi', },
    { id: 6, title: 'filipino', value: 'fil', },
    { id: 7, title: 'malay', value: 'ms', },
    { id: 8, title: 'hindi', value: 'hi', },
    { id: 9, title: 'indonesia', value: 'id', },
]

function LanguageScreen() {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector(state => state.user.selectedLanguage) || 'en';
    const userDetails = useSelector(state => state.user?.userData);
    console.log('selectedLanguage ======', selectedLanguage)
    const [selectLang, setSelectLanguage] = useState(selectedLanguage || 'en')
    useEffect(() => {
        const lang = StringsOfLanguages.getLanguage() || 'en';
        handleSelectLang(lang);
    }, [])

    const handleSelectLang = (newValue) => {
        console.log("userDetails11", userDetails)
        StringsOfLanguages.setLanguage(newValue);
        setSelectLanguage(newValue)
        console.log('newValue', newValue)
        dispatch(setSelectedLanguage(newValue))
        if (userDetails) {
            console.log("userDetails>>>", userDetails)
            dispatch(updateUser({
                email: userDetails?.email,
                name: userDetails?.name,
                language: newValue
            }));
        }

    }



    return (
        <MainContainer>
            <Header isBack={true} showSearch={false} />
            <View>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.TextBlack }}>
                        {StringsOfLanguages.selectLanguage}
                    </Text>
                </View>
                <ScrollView>
                    <View style={{ marginTop: 20 }}>
                        <RadioButton.Group
                            onValueChange={newValue => {
                                handleSelectLang(newValue)
                            }}
                            value={selectLang}>
                            {Array.isArray(languageList) && languageList.map((ele, index) =>
                                <TouchableOpacity activeOpacity={0.7} key={index} onPress={() => setSelectLanguage('en')}>
                                    <Card style={{ backgroundColor: theme.White, width: deviceWidth - 20, borderRadius: 10, height: 60, marginVertical: 5, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }} >
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 8, width: deviceWidth - 40, alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, fontWeight: '600', color: theme.TextBlack }}>{StringsOfLanguages[ele.title]}</Text>
                                            <RadioButton.Android value={ele?.value} />
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )}
                        </RadioButton.Group>
                    </View>
                </ScrollView>
            </View>

        </MainContainer>
    )
}

export default LanguageScreen;