import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import * as Location from 'expo-location';
// de09caad7401ee6a082f4634521fe63d

//06866d93dfd89a0196449190e5751425
//Asukakey
export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const API_key = "06866d93dfd89a0196449190e5751425";
  let lat = "";
  let lon = "";
  let response = "vide";
  console.log("1) Start")

  

  useEffect(() => {
    (async () => {

      console.log(`4) useEffect Avant Location`);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setLocation(await Location.getCurrentPositionAsync({}));
      console.log(`5) useEffect Après Location`);
    })();
  }, []);

  useEffect(() => {
    getData();
    
  }, [location])

  useEffect(() => {
    console.log(weather);
  }, [weather])
  
  const getData = async () => {
    let api_meteo_url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_key}`;

    try {
      response = await fetch(api_meteo_url);
      if (!response.ok) {
        console.log(`2) response no ok ${response.ok} || lat = ${location.lat}, lon = ${location.lon}, key = ${API_key}`);
        throw new Error(`Response status: ${response.status}`);
      } else {
        console.log("3) response ok");
        setWeather(await response.json());
      }

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text> Vos waifu préféré vous présent la météo !!</Text>
      <Text> {console.log("&) Update")}  a  </Text>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
