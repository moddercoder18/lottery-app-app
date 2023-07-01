/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  StatusBar,
  StyleSheet, useColorScheme,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { navigationRef } from './src/services/NavigationService';
import { Main } from './src/services/rootnavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Provider as PaperProvider } from 'react-native-paper';
import paperTheme from './src/theme/theme';
import FlashMessage from 'react-native-flash-message';
import StringsOfLanguages from './src/utils/localization';
import { useEffect } from 'react';
import Apploader from './apploader';


const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${1}`;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [initialState, setInitialState] = useState();
  // const loadingData = useSelector(state => state.user.loading);
  const onStateChange = useCallback(
    (state: any) => AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );

  // useEffect(() => {
  //   StringsOfLanguages.setLanguage('en');
  // }, [])

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={{ flex: 1, backgroundColor: isDarkMode ? '#2c2928' : '#ededed' }}>
        <NavigationContainer ref={navigationRef}
          {...{ onStateChange, initialState }}>
          <Provider store={store}>
            <Apploader />
            <FlashMessage position="top" />
          </Provider>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}



export default App;
