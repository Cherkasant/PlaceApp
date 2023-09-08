import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import OutlineButton from '../components/ui/OutlineButton'
import { Colors } from '../constants/colors'
import { useEffect, useState } from 'react'
import { fetchPlaceDetails } from '../util/database'

const PlaceDetails = ({ route, navigation }) => {

    const [fetchedPlace, setFetchedPlace] = useState()

    const showMap = () => {
        navigation.navigate('Map', { initialLat: fetchedPlace.location.lat, initialLng: fetchedPlace.location.lng })
    }

    const placeId = route.params.placeId
    useEffect(() => {
        async function loadPlaceDetails() {
            const details = await fetchPlaceDetails(placeId)
            setFetchedPlace(details)
            navigation.setOptions({ title: details.title })
        }

        loadPlaceDetails()
    }, [placeId])

    if (!fetchedPlace) {
        return <View>
            <Text>
                Loading place...
            </Text>
        </View>
    }


    return <ScrollView>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUrl }} />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
            <OutlineButton icon={'map'} onPress={showMap}>View on map</OutlineButton>
        </View>
    </ScrollView>
}

export default PlaceDetails


const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 200,
        width: '100%',

    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
})