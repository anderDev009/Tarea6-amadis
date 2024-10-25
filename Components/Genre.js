import { Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from "react";
import tw from "twrnc";

export default function GenderPredictor() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultGender, setResultGender] = useState({
        probability: 0,
        name: "Ingresa un nombre para comenzar",
        gender: null
    });

    const predict = async () => {
        if (!name.trim()) return;

        setLoading(true);
        try {
            const result = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(name)}`);
            const data = await result.json();
            setResultGender(data);
        } catch (error) {
            console.error('Error al predecir:', error);
        } finally {
            setLoading(false);
        }
    };

    const getGenderColor = () => {
        if (resultGender.gender === 'male') return 'rgb(34, 211, 238)';
        if (resultGender.gender === 'female') return 'rgb(244, 114, 182)';
        return 'rgb(156, 163, 175)';
    };

    const getGenderText = () => {
        if (resultGender.gender === 'male') return 'Hombre';
        if (resultGender.gender === 'female') return 'Mujer';
        return 'Sin predicción';
    };

    return (
        <View style={tw`p-6 bg-gray-50 min-h-full`}>
            {/* Header */}
            <View style={tw`mb-8`}>
                <Text style={tw`text-2xl font-bold text-center text-gray-800`}>
                    Predictor de Género
                </Text>
                <Text style={tw`text-center text-gray-600 mt-2`}>
                    Descubre el género probable basado en un nombre
                </Text>
            </View>

            {/* Input Section */}
            <View style={tw`bg-white p-4 rounded-xl shadow-sm`}>
                <Text style={tw`text-gray-700 text-base mb-2`}>
                    Nombre:
                </Text>
                <TextInput
                    style={tw`border border-gray-300 rounded-lg p-3 text-base bg-gray-50`}
                    placeholder="Ingresa un nombre"
                    value={name}
                    onChangeText={setName}
                    onSubmitEditing={predict}
                />

                <TouchableOpacity
                    style={tw`mt-4 bg-blue-500 p-4 rounded-lg flex-row justify-center items-center`}
                    onPress={predict}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={tw`font-bold text-white text-center text-base`}>
                            Predecir Género
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Results Section */}
            <View style={tw`mt-6 bg-white p-4 rounded-xl shadow-sm`}>
                <Text style={tw`text-lg font-semibold text-gray-800 mb-4 text-center`}>
                    Resultados
                </Text>

                <View style={tw`space-y-4`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-gray-600`}>Nombre analizado:</Text>
                        <Text style={tw`font-medium text-gray-800`}>{resultGender.name}</Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-gray-600`}>Género predicho:</Text>
                        <Text style={[
                            tw`font-medium px-3 py-1 rounded-full`,
                            { backgroundColor: getGenderColor(), color: 'white' }
                        ]}>
                            {getGenderText()}
                        </Text>
                    </View>

                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-gray-600`}>Probabilidad:</Text>
                        <View style={tw`flex-row items-center`}>
                            <View style={[
                                tw`h-2 rounded-full bg-gray-200 w-24 mr-2`,
                                { overflow: 'hidden' }
                            ]}>
                                <View style={[
                                    tw`h-full rounded-full`,
                                    {
                                        backgroundColor: getGenderColor(),
                                        width: `${resultGender.probability * 100}%`
                                    }
                                ]} />
                            </View>
                            <Text style={tw`font-medium text-gray-800`}>
                                {(resultGender.probability * 100).toFixed(1)}%
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}