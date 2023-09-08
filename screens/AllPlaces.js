import PlacesList from '../components/Places/PlacesList'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { fetchPlaces } from '../util/database'

const AllPlaces = ({ route }) => {
    const [loadedPlace, setLoadedPlace] = useState([])
    const isFocused = useIsFocused()
    useEffect(() => {
        async function getPlaces() {
            const places = await fetchPlaces()
            setLoadedPlace(places)
        }

        if (isFocused) {
            getPlaces()
        }

    }, [isFocused])


    return <PlacesList places={loadedPlace} />
}

export default AllPlaces