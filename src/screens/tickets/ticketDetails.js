import React, { } from 'react';
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/header';
import MainContainer from '../../components/mainContainer';
import { Card } from 'react-native-paper';
import { deviceWidth } from '../../utils/device';
import theme from '../../theme/resources';
import { useRoute } from '@react-navigation/native';
import WinningIcon from '../../assets/images/win.png'


const dummyData = [
    { id: 1, numbers: [2, 3, 45, 6, 5], powerNumbers: [78] },
    { id: 2, numbers: [2, 3, 45, 6, 5], powerNumbers: [78] },
    { id: 3, numbers: [2, 3, 45, 6, 5], powerNumbers: [78] },
]

function TicketDetailsScreen() {

    const route = useRoute();
    const { details } = route?.params;

    console.log("details", details)

    const renderItem = ({ item, index }) => {
        return (
            <Card
                style={{
                    backgroundColor: theme.White,
                    marginTop: 20,
                    flexDirection: 'column',
                    padding: 5,
                    paddingVertical: 8,
                    marginHorizontal: 8,
                    paddingBottom: 8,
                    position: 'relative'
                }}>

                <View style={{ marginLeft: 10, marginBottom: 10, marginTop: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Line{index + 1}</Text>
                </View>
                {item?.isWinner && <View style={{ position: 'absolute', top: 2, right: 4 }}>
                    <Image source={WinningIcon} style={{ width: 30, height: 30, }} />
                </View>}
                <View
                    style={{ flexDirection: 'row', width: 80, alignItems: 'center' }}>
                    {item.numbers.map((el, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.7}
                            style={{
                                borderWidth: 1,
                                borderColor: '#2f6cd0',
                                width: 30,
                                height: 30,
                                alignItems: 'center',
                                borderRadius: 4,
                                justifyContent: 'center',
                                backgroundColor: '#2f6cd0',
                                marginHorizontal: 6,
                                marginVertical: 6,
                            }}>
                            <Text style={{ color: theme.White }}>{el}</Text>
                        </TouchableOpacity>
                    ))}
                    {item.powerNumbers.map((el, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.7}
                            style={{
                                borderWidth: 1,
                                borderColor: theme.Primary,
                                width: 30,
                                height: 30,
                                alignItems: 'center',
                                borderRadius: 4,
                                justifyContent: 'center',
                                backgroundColor: theme.Primary,
                                marginHorizontal: 6,
                                marginVertical: 6,
                            }}>
                            <Text style={{ color: theme.White }}>{el}</Text>
                        </TouchableOpacity>
                    ))}

                </View>

            </Card>
        )
    }

    return (
        <MainContainer>
            <Header isBack={true} />
            <FlatList
                data={details?.tickets}
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
export default TicketDetailsScreen