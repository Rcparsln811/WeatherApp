import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=40.838720&lon=31.162609&appid=e8ec05419e180546c3b9a34f08219ebb&units=metric`;
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

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
  const [weather, setWeather] = useState<Weather>();

  const fetchWeather = async () => {
    const lat = 40.838720;
    const lon = 31.162609;

    const results = await fetch(
      BASE_URL
    );
    
    const data = await results.json();
    setWeather(data);
    
  };
  useEffect (()=> {
    fetchWeather();
   }, []);

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
    backgroundColor: 'white',
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
