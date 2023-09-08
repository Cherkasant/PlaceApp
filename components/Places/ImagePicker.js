import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { launchCameraAsync, PermissionStatus, useCameraPermissions } from 'expo-image-picker'
import { useState } from 'react'
import { Colors } from '../../constants/colors'
import OutlineButton from '../ui/OutlineButton'

const ImagePicker = ({ isImage }) => {

    const [pickedImage, setPickedImage] = useState(null)
    const [status, requestPermission] = useCameraPermissions()

    const verifyPersmissionIOS = async () => {
        if (status.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }
        if (status.status === PermissionStatus.DENIED) {
            Alert.alert('Failed permission', 'You need to grant permission to use this app.')
            return false
        }
        return true
    }

    const imageHandler = async () => {
        const hasPermission = await verifyPersmissionIOS()
        if (!hasPermission) {
            return
        }
        const image = await launchCameraAsync({ allowsEditing: true, aspect: [16, 9], quality: 0.5 })
        setPickedImage(image.assets[0].uri)
        isImage(image.assets[0].uri)
    }

    return <View>
        <View style={styles.imageContainer}>
            {pickedImage ? <Image source={{ uri: pickedImage }} style={styles.image} /> :
                <Text>No images yet...</Text>}
        </View>
        <OutlineButton icon={'camera'} onPress={imageHandler}>Take image</OutlineButton>
    </View>
}

export default ImagePicker


const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: 200,
    },
})