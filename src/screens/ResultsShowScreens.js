
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';
import yelp from '../api/yelp';
import { createOpenLink } from 'react-native-open-maps';



const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');
    const getResult = async id => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    };
      
    useEffect(() => {
        getResult(id);

    }, []);

    if (!result) {
        return null;
    } else {
        console.log(result.coordinates['latitude'])
    }
    const coordinatesRestaurant = { latitude: result.coordinates['latitude'], longitude: result.coordinates['longitude'] };
    const openMap = createOpenLink(coordinatesRestaurant);
    const openMApZoomedOut = createOpenLink({ ...coordinatesRestaurant, zoom: 30 });
     
    
    
    return (
        <View>
            <Text style={styles.title}> {result.name}</Text>
            <FlatList
                horizontal
                data={result.photos}
                keyExtractor = {(photo) => photo}
                renderItem={({item}) => {
                    return <Image style={styles.image} source={{uri: item}} />
                }}
            />
            <Text style={styles.phone}>
                <Text style={{fontWeight: "bold"}}>Phone Number:</Text>
                <Text> {result.phone}</Text>
            </Text>
            <Button
            onPress={openMap}
            title="Go to The Restaurant" />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300
    },
    title: {
        fontSize: 28, 
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 15
    },
    phone: {
        fontSize: 18, 
        marginLeft: 15,
        marginTop: 15
    },
    button: {
        marginTop: 25

    }
});

export default ResultsShowScreen;
