import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useCallback } from 'react';

const WeatherComponent = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const API_KEY = 'bc502f4d217feb5a376a7ef2c0c3829c';

    const getWeather = useCallback(async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=es`
            );
            const data = await response.json();
            console.log(data);
            setWeatherData(data);
            setLoading(false);
        } catch (err) {
            setError('Error al obtener datos del clima');
            setLoading(false);
        }
    }, []);

    const getLocation = useCallback(async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permiso de ubicación denegado');
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            getWeather(location.coords.latitude, location.coords.longitude);
        } catch (err) {
            setError('Error al obtener la ubicación');
            setLoading(false);
        }
    }, [getWeather]);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.text}>Cargando clima...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {weatherData && (
                <>
                    <Text style={styles.cityText}>{weatherData.name}</Text>
                    <Text style={styles.tempText}>
                        {Math.round(weatherData.main.temp)}°C
                    </Text>
                    <Text style={styles.descText}>
                        {weatherData.weather[0].description}
                    </Text>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailText}>
                            Humedad: {weatherData.main.humidity}%
                        </Text>
                        <Text style={styles.detailText}>
                            Viento: {Math.round(weatherData.wind.speed * 3.6)} km/h
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    cityText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tempText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    descText: {
        fontSize: 24,
        marginBottom: 20,
        textTransform: 'capitalize',
    },
    detailsContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    text: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default WeatherComponent;