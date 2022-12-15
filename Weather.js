import React from "react";
import { Text, Alert, StyleSheet, View, Image } from "react-native";
import * as Location from 'expo-location';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";
import {REACT_APP_WEATHER_KEY} from "@env";
import axios from "axios";

const weatherOptions = {
    Thunderstorm: {
        iconName: "weather-lightning",
        gradient: ["#373B44", "#4286f4"]
    },
    Drizzle: {
        iconName: "weather-hail",
        gradient: ["#89F7FE", "#66A6FF"]
    },
    Rain: {
        iconName: "weather-rainy",
        gradient: ["#00C6FB", "#005BEA"]
    },
    Snow: {
        iconName: "weather-snowy",
        gradient: ["#7DE2FC", "#B9B6E5"]
    },
    Atmosphere: {
        iconName: "weather-hail",
        gradient: ["#89F7FE", "#66A6FF"]
    },
    Clear: {
        iconName: "weather-sunny",
        gradient: ["#FF7300", "#FEF253"]
    },
    Clouds: {
        iconName: "weather-cloudy",
        gradient: ["#D7D2CC", "#304352"]
    },
    Mist: {
        iconName: "weather-hail",
        gradient: ["#4DA0B0", "#D39D38"]
    },
    Dust: {
        iconName: "weather-hail",
        gradient: ["#4DA0B0", "#D39D38"]
    },
    Haze: {
        iconName: "weather-hail",
        gradient: ["#4DA0B0", "#D39D38"]
    }
}

export default class Weather extends React.Component {

    state = {
        cond : "Clear"
    }

    getWeather = async (latitude, longitude) => {
        try {
            const {data} = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_KEY}&units=metric`
            );
            console.log(data);
        console.log(data.main.temp); 
        console.log(data.main.temp_max);
        console.log(data.main.temp_min);
        console.log(data.weather[0].main);
        this.setState({cond: data.weather[0].main, temp: data.main.temp, temp_max: data.main.temp_max, 
            temp_min: data.main.temp_min, humidity: data.main.humidity, feels_like: data.main.feels_like});
        }        
         catch(error) {
            Alert.alert("Error", error.message)
        }
    };

    getLocation = async () => {
        try {
            //await location

            await Location.requestForegroundPermissionsAsync();
            const location = await Location.getCurrentPositionAsync();
            console.log(location);
            console.log(location.coords.latitude);
            console.log(location.coords.longitude);

            this.getWeather(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            Alert.alert("error", {error})
        }
    };

    componentDidMount() {
        this.getLocation();

    };

    render () {

        const {cond, temp, temp_max, temp_min, feels_like, humidity} = this.state;

        return (

            <LinearGradient
            colors={weatherOptions[cond].gradient}
            style={styles.container}
            >

            

            <View style={[styles.container]}>
                <View style={[styles.halfcontainer]}>
                    <MaterialCommunityIcons name={weatherOptions[cond].iconName} size={256} color="black" />
                    <Text style={[styles.temptitle]}> 현재온도:{temp} °C </Text>
                </View>
                  <Text style={styles.title}>{cond}</Text>
                <View style={styles.halfcontainer}>

                  <Text style={styles.temp_max}>최고온도:{temp_max}°C</Text>
                  <Text style={styles.temp_min}>최저온도:{temp_min}°C</Text>
                  <Text style={styles.feels_like}>체감온도:{feels_like} °C</Text>
                  <Text style={styles.humidity}>습도:{humidity}%</Text>
                </View>
            </View>
            </LinearGradient>
        );
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    halfcontainer: {
        flex: 1,
        justifyContent : "center",
        alignItems: "center",
    },
    temptitle: {
        fontSize: 24,
    },
    temp_max: {
        fontSize:25
    },
    temp_min:{
        fontSize:25
    },
    feels_like:{
        fontSize:25
    },
    humidity:{
        fontSize:25
    }
});