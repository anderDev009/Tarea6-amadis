import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import React from "react";
import { Feather } from '@expo/vector-icons'; // Asegúrate de tener expo instalado
import tool from "../assets/caja.png";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation();

    const menuItems = [
        {
            title: "Adivinador de género",
            icon: "user",
            route: "Genero",
            color: "bg-purple-500"
        },
        {
            title: "Adivinador de edad",
            icon: "calendar",
            route: "Edad",
            color: "bg-pink-500"
        },
        {
            title: "Adivinador de país",
            icon: "globe",
            route: "Pais",
            color: "bg-blue-500"
        },
        {
            title: "Clima",
            icon: "cloud",
            route: "Clima",
            color: "bg-yellow-500"
        },
        {
            title: "Noticias de WordPress",
            icon: "rss",
            route: "WordpressApi",
            color: "bg-green-500"
        },
        {
            title: "Acerca de mí",
            icon: "info",
            route: "Acerca de",
            color: "bg-red-500"
        }
    ];

    const MenuButton = ({ item }) => (
        <TouchableOpacity
            style={tw`${item.color} w-40 h-40 rounded-3xl p-6 m-2 shadow-lg`}
            onPress={() => navigation.navigate(item.route)}
        >
            <View style={tw`flex-1 justify-between`}>
                <Feather name={item.icon} size={30} color="white" />
                <Text style={tw`text-white font-bold text-lg`}>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={tw`flex-1 bg-gradient-to-b from-sky-400 bg-sky-600`}>
            {/* Header Section */}
            <View style={tw`items-center pt-12 pb-6`}>
                <View style={tw`bg-white p-1 rounded-full shadow-xl`}>
                    <Image
                        source={tool}
                        style={tw`w-32 h-32 rounded-full`}
                    />
                </View>
                <Text style={tw`text-white mt-4 text-2xl font-bold`}>
                    Práctica 6 Amadis
                </Text>
                <Text style={tw`text-white opacity-80 mt-2`}>
                    Selecciona una opción
                </Text>
            </View>

            {/* Menu Grid */}
            <ScrollView
                style={tw`flex-1`}
                contentContainerStyle={tw`px-4 py-6`}
            >
                <View style={tw`flex-row flex-wrap justify-center`}>
                    {menuItems.map((item, index) => (
                        <MenuButton key={index} item={item} />
                    ))}
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={tw`pb-6 items-center`}>
                <Text style={tw`text-white opacity-60`}>
                    Versión 1.0.0
                </Text>
            </View>
        </View>
    );
}