import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import * as Location from 'expo-location';
// de09caad7401ee6a082f4634521fe63d

//06866d93dfd89a0196449190e5751425
//Asukakey
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const API_key = "06866d93dfd89a0196449190e5751425";
  let lat = "";
  let lon = "";
  let response = "vide";

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) async () => {
    text = JSON.stringify(location);
    lat = location.lat;
    lon = location.lon;
    
    let api_meteo_url =  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}";
    
    response = await fetch(api_meteo_url);
    let reponseJson = await reponse.json();


    
  }

  return (
    <View style={styles.container}>
      <Text> Vos waifu préféré vous présent la méthéo : {text} </Text>
      <text> {reponseJson.api_meteo_url}
      </text>
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
