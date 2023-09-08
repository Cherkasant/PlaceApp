import PlaceForm from '../components/Places/PlaceForm'
import { insertPlace } from '../util/database'

const AddPlace = ({ navigation }) => {
    const createPlaceHandler = async (place) => {
        if (place.address) {
            await insertPlace(place)
        }

        navigation.navigate('AllPlaces', { place: place })
    }

    return <PlaceForm onCreatePlace={createPlaceHandler} />
}

export default AddPlace