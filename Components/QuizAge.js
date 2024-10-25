import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from "react";
import tw from "twrnc";
import { Feather } from '@expo/vector-icons';

export default function Edad() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultGender, setResultGender] = useState({
        name: "Pon tu nombre y dale click!",
        age: 0
    });

    const predict = async () => {
        if (!name.trim()) {
            return; // No hacer nada si el input está vacío
        }
        setLoading(true);
        try {
            const result = await fetch('https://api.agify.io/?name=' + name);
            const data = await result.json();
            setResultGender(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={tw`flex-1 bg-gradient-to-b from-purple-500 bg-indigo-600 p-6`}>
            {/* Header */}
            <View style={tw`items-center mb-10 mt-6`}>
                <Feather name="calendar" size={50} color="white" />
                <Text style={tw`text-white text-2xl font-bold mt-4`}>
                    Predictor de Edad
                </Text>
                <Text style={tw`text-white opacity-80 text-center mt-2`}>
                    Descubre la edad promedio asociada a un nombre
                </Text>
            </View>

            {/* Input Section */}
            <View style={tw`bg-white rounded-3xl p-6 shadow-lg`}>
                <Text style={tw`text-gray-600 text-lg mb-2 font-medium`}>
                    Nombre:
                </Text>
                <View style={tw`flex-row items-center bg-gray-100 rounded-xl px-4 mb-4`}>
                    <Feather name="user" size={20} color="#666" />
                    <TextInput
                        style={tw`flex-1 py-3 px-2 text-lg text-gray-800`}
                        placeholder="Escribe un nombre"
                        placeholderTextColor="#999"
                        onChangeText={setName}
                        value={name}
                    />
                </View>

                <TouchableOpacity
                    style={tw`bg-indigo-600 py-4 rounded-xl flex-row justify-center items-center ${!name.trim() ? 'opacity-50' : ''}`}
                    onPress={predict}
                    disabled={loading || !name.trim()}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <Feather name="search" size={20} color="white" style={tw`mr-2`} />
                            <Text style={tw`text-white font-bold text-lg`}>
                                Predecir Edad
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* Result Section */}
            <View style={tw`mt-6 bg-white/20 rounded-3xl p-6`}>
                <View style={tw`flex-row justify-between items-center mb-4`}>
                    <View style={tw`flex-row items-center`}>
                        <Feather name="user" size={20} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-white text-lg`}>
                            Nombre:
                        </Text>
                    </View>
                    <Text style={tw`text-white text-lg font-bold`}>
                        {resultGender.name}
                    </Text>
                </View>

                <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row items-center`}>
                        <Feather name="calendar" size={20} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-white text-lg`}>
                            Edad:
                        </Text>
                    </View>
                    <Text style={tw`text-white text-lg font-bold`}>
                        {resultGender.age > 0 ? `${resultGender.age} años` : '-'}
                    </Text>
                </View>
            </View>
        </View>
    );
}