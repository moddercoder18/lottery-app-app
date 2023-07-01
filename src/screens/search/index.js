import React from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MainContainer from '../../components/mainContainer';
import Header from '../../components/header';
import { Card } from 'react-native-paper';
import theme from '../../theme/resources';
import { deviceWidth } from '../../utils/device';

const listItem = [
    { id: 1, color: theme.White, backgroundColor: theme.Primary, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 2, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
    { id: 3, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 4, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
    { id: 5, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 6, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
    { id: 7, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/megamillions.png') },
    { id: 8, color: theme.Black, backgroundColor: theme.White, title: 'US$', price: 235, desc: 'Million', imageUrl: require('../../assets/images/powerBall.png') },
]


function Search() {

    const renderItem = ({ item }) => {
        return (
            <Card style={{ backgroundColor: item.backgroundColor, width: deviceWidth - 20, height: 90, marginVertical: 5, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }} >
                <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                    <Image source={item.imageUrl} style={{ width: 50, height: 50, borderRadius: 25, }} />
                    <View style={{ paddingLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: item.color, fontSize: 18, fontWeight: '700' }}>{item?.title}</Text>
                            <Text style={{ color: item.color, fontSize: 24, fontWeight: '700', marginLeft: 8 }}>{item?.price}</Text>
                            <Text style={{ color: item.color, fontSize: 24, fontWeight: '700', marginLeft: 8 }}>{item?.desc}</Text>
                        </View>
                        <View>
                            <Text style={{ color: item.color }}>11:56:10</Text>
                        </View>

                    </View>
                </View>
            </Card>
        )
    }

    return (
        <MainContainer>
            <Header isBack={false} showSearch={false} />

            <FlatList
                data={listItem}
                style={{ marginTop: 20 }}
                // contentContainerStyle={{ height: 200 }}
                // ItemSeparatorComponent={() => <View style={{ marginHorizontal: 6 }} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />


        </MainContainer>
    )
}

export default Search;