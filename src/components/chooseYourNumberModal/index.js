import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../theme/resources';
import { deviceHeight, deviceWidth } from '../../utils/device';
import { Card } from 'react-native-paper';
import ReloadIcon from '../../assets/images/reload.png';
import {
  generateUniqueRandomNumbers,
} from '../../utils/currencyhelper';

function ChooseYourNumberModal({
  isVisible,
  handleClose,
  selectTicket,
  setSelectTicket,
  totalShowNumber,
  totalShowPowerNumber,
  maxSelectTotalNumber,
  maxSelectTotalPowerNumber
}) {
  const { top } = useSafeAreaInsets();
  const [showTicketNumbers, setSelectedNumbers] = useState([]);
  useEffect(() => {
    const lines = [...selectTicket];
    const showLines = lines.map(({ numbers, powerNumbers }) => {
      const showNumbers = Object.keys(numbers)
        .map(n => Number(n))
        .sort((a, b) => a - b);
      if (showNumbers.length < maxSelectTotalNumber) {
        for (let i = showNumbers.length; i < maxSelectTotalNumber; i++) {
          showNumbers.push('');
        }
      }
      const showPowerNumbers = Object.keys(powerNumbers)
        .map(n => Number(n))
        .sort((a, b) => a - b);
      if (showPowerNumbers.length < maxSelectTotalPowerNumber) {
        for (let i = showPowerNumbers.length; i < maxSelectTotalPowerNumber; i++) {
          showPowerNumbers.push('');
        }
      }
      return {
        numbers: showNumbers,
        powerNumbers: showPowerNumbers,
      }
    });
    setSelectedNumbers([...showLines]);
  }, [selectTicket]);

  const handleQuickPick = parentIndex => {
    const tickets = [...selectTicket];
    const selectedLine = { ...tickets[parentIndex] };
    const numbers = generateUniqueRandomNumbers(
      1,
      totalShowNumber,
      maxSelectTotalNumber,
      [...Object.keys(selectedLine.numbers).map((i) => Number(i)).sort((a, b) => a - b)]
    );
    const powerNumbers = generateUniqueRandomNumbers(
      1,
      totalShowPowerNumber,
      maxSelectTotalPowerNumber,
      [...Object.keys(selectedLine.powerNumbers).map((i) => Number(i)).sort((a, b) => a - b)]
    );
    selectedLine.numbers = numbers.reduce((numbers, n) => {
      numbers[n] = true;
      return numbers;
    }, {});
    selectedLine.powerNumbers = powerNumbers.reduce((numbers, n) => {
      numbers[n] = true;
      return numbers;
    }, {});
    tickets[parentIndex] = selectedLine;
    setSelectTicket([...tickets]);
  };
  return (
    <Modal
      supportedOrientations={[
        'landscape',
        'portrait',
        'landscape-right',
        'landscape-left',
        'portrait-upside-down',
      ]}
      visible={isVisible}
      onDismiss={handleClose}
      style={{
        padding: 20,
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        // height: 100,
        paddingBottom: 0,
        marginTop: top,
        marginHorizontal: 10,
      }}>

      <View
        style={{
          width: deviceWidth - 20,
          height: deviceHeight - (top + 40),
          marginTop: top,
          marginHorizontal: 10,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: theme.searchBarBackgorund,
        }}>
        <View
          style={{
            position: 'relative',
            height: 40,
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{ fontSize: 20, color: theme.TextBlack }}> {selectTicket.length} Lines</Text>
          </View>
          <TouchableOpacity onPress={handleClose} style={{}} activeOpacity={0.9}>
            <Image
              source={require('../../assets/images/closeIcon.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {showTicketNumbers.map((el, idx) => (
            <Card
              key={idx}
              style={{
                backgroundColor: theme.White,
                marginTop: 20,
                flexDirection: 'column',
                padding: 5,
                paddingVertical: 8,
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                <View
                  style={{ flexDirection: 'row', width: 80, alignItems: 'center' }}>
                  {el.numbers.map((el, index) => (
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
                        backgroundColor: theme.White,
                        marginHorizontal: 6,
                        marginVertical: 6,
                      }}>
                      <Text style={{ color: theme.TextBlack }}>{el}</Text>
                    </TouchableOpacity>
                  ))}
                  {el.powerNumbers.map((el, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.7}
                      style={{
                        borderWidth: 1,
                        borderColor: theme.bagHighlighterGrey,
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        borderRadius: 4,
                        justifyContent: 'center',
                        backgroundColor: theme.White,
                        marginHorizontal: 6,
                        marginVertical: 6,
                      }}>
                      <Text style={{ color: theme.TextBlack }} >{el}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ marginLeft: 5 }}
                    onPress={() => {
                      handleQuickPick(idx);
                    }}>
                    <Image source={ReloadIcon} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Card>
          ))}
        </ScrollView>
      </View>

    </Modal>
  );
}

export default ChooseYourNumberModal;
