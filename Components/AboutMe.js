import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons'; // Asegúrate de tener expo instalado
import foto from "../assets/Perfil.jpg"
const AboutMeScreen = () => {
    // Datos personales - Actualiza con tu información
    const personalInfo = {
        name: "Richard ortiz",
        role: "Desarrollador",
        avatarUrl: "", // Reemplaza con tu foto real
        bio: "Desarrollador Backend Senior, experto en manejo de servidores y uso de tecnologías en la nube. Apasionado por la programación y la tecnología.",
        location: "Santo Domingo, Republica Dominicana",
        email: "richardanderdev009@gmail.com",
        phone: "+1 849 405 8099",
        github: "https://github.com/anderDev009",
        linkedin: "https://do.linkedin.com/in/richard-anderson-ortiz-heredia-83074a2b8",
        skills: [
            "Go",
            "JavaScript/TypeScript",
            "C#",
            "PHP",
            "REST APIs",
            "GraphQL",
            "AWS",
            "Git",
        ]
    };

    const handleContact = (type, value) => {
        switch (type) {
            case 'email':
                Linking.openURL(`mailto:${value}`);
                break;
            case 'phone':
                Linking.openURL(`tel:${value}`);
                break;
            case 'github':
                Linking.openURL(`https://${value}`);
                break;
            case 'linkedin':
                Linking.openURL(`https://${value}`);
                break;
            default:
                Alert.alert('Error', 'Método de contacto no válido');
        }
    };

    const ContactButton = ({ icon, text, onPress }) => (
        <TouchableOpacity style={styles.contactButton} onPress={onPress}>
            <Feather name={icon} size={20} color="#007AFF" />
            <Text style={styles.contactButtonText}>{text}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={foto }
                    style={styles.avatar}
                />
                <Text style={styles.name}>{personalInfo.name}</Text>
                <Text style={styles.role}>{personalInfo.role}</Text>
                <View style={styles.locationContainer}>
                    <Feather name="map-pin" size={16} color="#666" />
                    <Text style={styles.location}>{personalInfo.location}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sobre mí</Text>
                <Text style={styles.bio}>{personalInfo.bio}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                <View style={styles.skillsContainer}>
                    {personalInfo.skills.map((skill, index) => (
                        <View key={index} style={styles.skillBadge}>
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contacto</Text>
                <View style={styles.contactContainer}>
                    <ContactButton
                        icon="mail"
                        text="Email"
                        onPress={() => handleContact('email', personalInfo.email)}
                    />
                    <ContactButton
                        icon="phone"
                        text="Llamar"
                        onPress={() => handleContact('phone', personalInfo.phone)}
                    />
                    <ContactButton
                        icon="github"
                        text="GitHub"
                        onPress={() => handleContact('github', personalInfo.github)}
                    />
                    <ContactButton
                        icon="linkedin"
                        text="LinkedIn"
                        onPress={() => handleContact('linkedin', personalInfo.linkedin)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    role: {
        fontSize: 18,
        color: '#666',
        marginTop: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginLeft: 5,
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    bio: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -5,
    },
    skillBadge: {
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        margin: 5,
    },
    skillText: {
        color: '#1A73E8',
        fontSize: 14,
        fontWeight: '500',
    },
    contactContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        width: '48%',
    },
    contactButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '500',
    },
});

export default AboutMeScreen;