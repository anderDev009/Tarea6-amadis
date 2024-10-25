import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    RefreshControl, // Agregado para pull-to-refresh
} from 'react-native';

const WordPressNews = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // Estado para el refresh

    // URL del blog de WordPress (reemplazar con la URL deseada)
    const WORDPRESS_URL = 'http://www.blogpocket.com/wp-json/wp/v2';
    const SITE_LOGO = 'http://www.blogpocket.com/wp-content/uploads/2019/01/blogpocket-logo.png';

    const fetchPosts = async () => {
        try {
            const response = await fetch(
                `${WORDPRESS_URL}/posts?per_page=3&_embed`
            );
            const data = await response.json();
            setPosts(data);
            setLoading(false);
            setRefreshing(false); // Desactivar el refresh cuando termina la carga
        } catch (err) {
            setError('Error al cargar los posts');
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Función para el pull-to-refresh
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchPosts();
    }, []);

    // Función para abrir URLs en el navegador
    const openURL = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("No se puede abrir la URL: " + url);
            }
        });
    };

    // Función para limpiar el HTML del contenido
    const stripHTML = (html) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Cargando noticias...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                {/* Logo del sitio */}
                <Image
                    source={{ uri: SITE_LOGO }}
                    style={styles.logo}
                    resizeMode="contain"
                />

                {/* Lista de posts */}
                {posts.map((post, index) => (
                    <View key={post.id} style={styles.postContainer}>
                        {/* Imagen destacada del post */}
                        {post._embedded && post._embedded['wp:featuredmedia'] && (
                            <Image
                                source={{ uri: post._embedded['wp:featuredmedia'][0].source_url }}
                                style={styles.postImage}
                            />
                        )}

                        {/* Título del post */}
                        <Text style={styles.title}>
                            {stripHTML(post.title.rendered)}
                        </Text>

                        {/* Extracto del post */}
                        <Text style={styles.excerpt}>
                            {stripHTML(post.excerpt.rendered)}
                        </Text>

                        {/* Botón para visitar */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => openURL(post.link)}
                        >
                            <Text style={styles.buttonText}>Visitar</Text>
                        </TouchableOpacity>

                        {/* Separador */}
                        {index < posts.length - 1 && <View style={styles.separator} />}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: '100%',
        height: 80,
        marginBottom: 20,
    },
    postContainer: {
        marginBottom: 20,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    excerpt: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 15,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default WordPressNews;