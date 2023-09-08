import MapView, { Marker } from 'react-native-maps'
import { Alert, StyleSheet } from 'react-native'
import { useCallback, useLayoutEffect, useState } from 'react'
import IconButton from '../components/ui/IconButton'

const Map = ({ navigation, route }) => {
    const initialLocation = route.params && { lat: route.params.initialLat, lng: route.params.initialLng }

    const region = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.04821,
    }
    const [selectedLocation, setSelectedLocation] = useState(initialLocation)
    const selectLocation = (event) => {
        if (initialLocation) {
            return
        }
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude
        setSelectedLocation({ lat: lat, lng: lng })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked', 'Need to pick the location first!')
            return
        }
        navigation.navigate('AddPlace', { pickedLat: selectedLocation.lat, pickedLong: selectedLocation.lng })
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        if (initialLocation) {
            return
        }
        navigation.setOptions({
            headerRight: ({ tintColor }) => <IconButton icon={'save'} size={24} color={tintColor}
                                                        onPress={savePickedLocationHandler} />
            ,
        })
    }, [navigation, savePickedLocationHandler])


    return <MapView style={styles.map} initialRegion={region} onPress={selectLocation}>{selectedLocation &&
        <Marker title={'Picked location'}
                coordinate={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                }} />}</MapView>
}

export default Map

const styles = StyleSheet.create({
    map: { flex: 1 },
})