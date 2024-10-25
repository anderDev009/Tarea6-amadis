import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from "react";
import tw from "twrnc";

export default function Country() {
    const [name, setName] = useState("");
    const [resultCountries, setResultCountries] = useState([]);

    const predict = async () => {
        const result = await fetch('http://universities.hipolabs.com/search?country=' + name);
        const data = await result.json();
        setResultCountries(data);
    }

    return (
        <ScrollView contentContainerStyle={tw`flex-grow items-center p-4`}>
            {/* Entrada del país */}
            <View style={tw`mt-8 w-full items-center`}>
                <Text style={tw`text-lg font-bold text-gray-700`}>
                    País:
                </Text>
                <TextInput
                    style={tw`border-2 border-gray-300 w-60 p-2 mt-2 rounded-md`}
                    placeholder="Escribe un país"
                    onChangeText={(text) => setName(text)}
                />
            </View>

            {/* Botón de búsqueda */}
            <TouchableOpacity
                style={tw`bg-blue-600 w-60 mt-6 p-3 rounded-full`}
                onPress={predict}>
                <Text style={tw`text-white font-bold text-center`}>
                    Buscar universidades
                </Text>
            </TouchableOpacity>

            {/* Resultados de la búsqueda */}
            <View style={tw`mt-8 w-full items-center`}>
                <Text style={tw`text-xl font-semibold text-gray-800`}>
                    Universidades encontradas:
                </Text>

                {/* Lista de países */}
                {resultCountries.length > 0 ? (
                    resultCountries.map((university, index) => (
                        <View
                            key={index}
                            style={tw`mt-4 w-full bg-white p-4 rounded-lg shadow-md`}>
                            <Text style={tw`text-lg font-bold text-gray-700`}>
                                Universidad: {university.name || "No disponible"}
                            </Text>
                            <Text style={tw`text-md text-gray-600 mt-2`}>
                                Dominio: {university.domains.length > 0 ? university.domains.join(", ") : "No disponible"}
                            </Text>
                            <Text style={tw`text-md text-gray-600 mt-2`}>
                                Página web: {university.web_pages.length > 0 ? university.web_pages.join(", ") : "No disponible"}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={tw`text-md text-gray-500 mt-4`}>
                        No se encontraron universidades. Intenta con otro país.
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}
