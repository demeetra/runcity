/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect, type PropsWithChildren } from 'react';
import SampleInput from './src/SampleInput';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const apiUrl = 'http://10.0.2.2:3000/api/v1/games';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        apiUrl,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      )

      const json = await response.json()
      setData(json.data)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
  };
  useEffect(() => {
    getData()
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundStyle.backgroundColor} />

      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View>
              <Text style={{textAlign: "center"}}>{item.title}</Text>
              <Image source={{ uri: item.image}} style={{width: '100%', height: 150}} />
            </View>
          )}
        />
      )}

      {/* <SampleInput/> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
