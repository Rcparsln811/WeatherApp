import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';


const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const OPEN_WEATHER_KEY = 'e8ec05419e180546c3b9a34f08219ebb';

type Weather = {
  name: string;
  main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number; 
      
  };
 };

const WeatherApp = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');
  const [weather, setWeather] = useState<Weather>();

  


  useEffect (()=> {
    fetchWeather();
   }, []);

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
  } else if (location) {
    text = JSON.stringify(location);
  }

  const fetchWeather = async () => {
    const lat = 40.838720;
    const lon = 31.162609;

    const results = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    const data = await results.json();
    setWeather(data);
    
  };
  

   if(!weather){
    return <ActivityIndicator/>;
   }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'OpenSans',
    fontSize: 30,
  },
  temp: {
    fontFamily: 'InterBlack',
    fontSize: 70,
    color: 'darkgray',
    fontWeight: 'bold'
  },
})

export default WeatherApp;
