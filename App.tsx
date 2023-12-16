import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, Image } from 'react-native';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';


const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const OPEN_WEATHER_KEY = 'e8ec05419e180546c3b9a34f08219ebb';

const bgImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg';

  type MainWeather = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };

 type Weather = {
  name: string;
  main: MainWeather;
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

const WeatherApp = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');
  const [weather, setWeather] = useState<Weather>();

  


  useEffect (()=> {
    fetchWeather();
   }, []);


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
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.raincon}>
          <Image
           style={styles.rain}
           source={require('./assests/rain.png')}
         />
          
        </View>

        
      
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
        
      </View>
 
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  location: {
    fontFamily: 'OpenSans',
    fontSize: 50,
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: 40 }], 
    
  },
  temp: {
    fontFamily: 'InterBlack',
    fontSize: 110,
    color: 'darkgray',
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -90 }], 
  },
  rain: {
    width: 200,
    height: '50%',
    padding: 0,
    paddingVertical: 20,
    position: 'absolute',
    top: 0,
  },
  raincon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
    height: '50%',
    paddingVertical: 0,
    paddingTop: 10,
    transform: [{ translateY: -170 }],
  }
});

export default WeatherApp;

