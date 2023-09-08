import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import OutlineButton from '../ui/OutlineButton'
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location'
import { useEffect, useState } from 'react'
import { getAddress, getMapPreview } from '../../util/location'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'


const LocationPicker = ({ isLocation }) => {
    const route = useRoute()
    const navigation = useNavigation()

    const isFocused = useIsFocused()

    const [pickedLocation, setPickedLocation] = useState()
    const [permission, requestPermission] = useForegroundPermissions()


    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = { lat: route.params.pickedLat, lng: route.params.pickedLng }
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
                isLocation({ ...pickedLocation, address: address })
            }
        }

        handleLocation().then(response => response)
    }, [pickedLocation, isLocation])

    const verifyPermissions = async () => {
        if (permission.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        if (permission.status === PermissionStatus.DENIED) {
            Alert.alert('Failed permission', 'You need to grant location permission to use this app.')
            return false
        }
        return true
    }


    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }
        const location = await getCurrentPositionAsync()

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })

    }
    const getMapHandler = () => {
        navigation.navigate('Map')
    }

    return <View>
        <View style={styles.map}>
            {pickedLocation ?
                <Image source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} style={styles.image} /> :
                <Text>No location yet..</Text>}
        </View>
        <View style={styles.buttons}>
            <OutlineButton icon={'location'} onPress={getLocationHandler}>Locate user</OutlineButton>
            <OutlineButton icon={'map'} onPress={getMapHandler}>Pick on Map</OutlineButton>
        </View>
    </View>
}

export default LocationPicker


const styles = StyleSheet.create({
    map: {
        marginVertical: 8,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
})