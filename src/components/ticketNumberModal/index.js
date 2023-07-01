import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import theme from '../../theme/resources';
import { generateUniqueRandomNumbers } from '../../utils/currencyhelper';
import { deviceHeight, deviceWidth } from '../../utils/device';
import Divider from '../divider';

function TicketNumberModal({
  isVisible,
  handleClose,
  selectTicket,
  totalShowNumber,
  totalShowPowerNumber,
  maxSelectTotalNumber,
  maxSelectTotalPowerNumber,
  setSelectTicket,
}) {
  const { top } = useSafeAreaInsets();

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

  const removeSelected = parentIndex => {
    const tickets = [...selectTicket];

    tickets[parentIndex] = {
      numbers: {},
      powerNumbers: {}
    };
    setSelectTicket([...tickets]);
  }

  const handleSelectTicketNumber = (parentIndex, index, chooseLength, type) => {
    const tickets = [...JSON.parse(JSON.stringify(selectTicket))];
    const selectedLine = { ...tickets[parentIndex] };
    if (type === 'numbers') {
      if (selectedLine.numbers[index]) {
        delete selectedLine.numbers[index];
      } else {
        selectedLine.numbers[index] = true;
        if (Object.keys(selectedLine[type]).length > chooseLength) {
          return false;
        }
      }
    } else if (type === 'powerNumbers') {
      if (selectedLine.powerNumbers[index]) {
        delete selectedLine.powerNumbers[index];
      } else {
        selectedLine.powerNumbers[index] = true;
        if (Object.keys(selectedLine[type]).length > chooseLength) {
          return false;
        }
      }
    }
    console.log('selectedLine', selectedLine)
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
      // transparent={true}
      style={{
        // paddingHorizontal: 20,
        padding: 20,
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        // height: 100,
        paddingBottom: 0,
        marginTop: top,
        marginHorizontal: 10,
      }}>
      <ScrollView horizontal>
        {selectTicket.map((lineEl, idx) => (
          <View
            key={idx}
            style={{
              width: deviceWidth - 20,
              height: deviceHeight - (top + 40),
              marginTop: top,
              marginHorizontal: 10,
              paddingHorizontal: 12,
              backgroundColor: '#e4f6f8',
              borderRadius: 8,
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
                <Text style={{ fontSize: 20, color: theme.TextBlack }}>
                  Line {idx + 1}/{selectTicket.length}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  removeSelected(idx)
                }>
                <Image
                  source={require('../../assets/images/deleteIcon.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  handleQuickPick(idx)
                }
                style={{
                  width: 160,
                  borderWidth: 1,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 90,
                  backgroundColor: theme.Primary,
                  borderColor: theme.Primary,
                }}>
                <Text style={{ color: theme.White }}>Quick Pick</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleClose} style={{}} activeOpacity={0.9}>
                <Image
                  source={require('../../assets/images/closeIcon.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: theme.TextBlack }}>
                  + Choose {maxSelectTotalNumber}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                {Array(totalShowNumber)
                  .fill(totalShowNumber)
                  .map((el, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        handleSelectTicketNumber(
                          idx,
                          index + 1,
                          maxSelectTotalNumber,
                          'numbers',
                        )
                      }
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
                        backgroundColor: lineEl.numbers[index + 1]
                          ? theme.Primary
                          : theme.White,
                        marginHorizontal: 6,
                        marginVertical: 6,
                      }}>
                      <Text
                        style={{
                          color: lineEl.numbers[index + 1]
                            ? theme.White
                            : theme.Primary,
                          fontWeight: 'bold',
                        }}>
                        {index + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
            <Divider />
            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: theme.TextBlack }}>
                  + Choose {maxSelectTotalPowerNumber}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                {Array(totalShowPowerNumber)
                  .fill(totalShowPowerNumber)
                  .map((el, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        handleSelectTicketNumber(
                          idx,
                          index + 1,
                          maxSelectTotalPowerNumber,
                          'powerNumbers',
                        )
                      }
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
                        backgroundColor: lineEl.powerNumbers[index + 1]
                          ? theme.Primary
                          : theme.White,
                        marginHorizontal: 6,
                        marginVertical: 6,
                      }}>
                      <Text
                        style={{
                          color: lineEl.powerNumbers[index + 1]
                            ? theme.White
                            : theme.Primary,
                          fontWeight: 'bold',
                        }}>
                        {index + 1}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
}

export default TicketNumberModal;
