import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useCallback, useState } from 'react'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import SubmitButton from '../ui/SubmitButton'
import { Place } from '../../models/place'

const PlaceForm = ({ onCreatePlace }) => {
    const [title, setTitle] = useState('')

    const [pickedLocation, setPickedLocation] = useState()
    const [selectedImage, setSelectedImage] = useState()

    const changeTitle = (value) => {
        setTitle(value)
    }

    const takeImageHandler = (imageUri) => {
        setSelectedImage(imageUri)
    }
    const pickedLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, [])

    const savePlaceHandler = () => {
        const placeData = new Place(title, selectedImage, pickedLocation)
        onCreatePlace(placeData)
    }
    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>
                Title
            </Text>
            <TextInput onChangeText={changeTitle} value={title} style={styles.input} />
        </View>
        <ImagePicker isImage={takeImageHandler} />
        <LocationPicker isLocation={pickedLocationHandler} />
        <SubmitButton onPress={savePlaceHandler}>Add Place</SubmitButton>
    </ScrollView>
}

export default PlaceForm

const styles = StyleSheet.create({
    form: { flex: 1, padding: 24 },
    label: { fontWeight: 'bold', margin: 4, color: Colors.primary500 },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
})