import { FlatList, StyleSheet, Text, View } from 'react-native'
import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const PlacesList = ({ places }) => {

    const navigation = useNavigation()

    const navigateToPlace = (id) => {
        navigation.navigate('PlaceDetails', { placeId: id })
    }

    if (!places || places.length === 0) {
        return <View style={styles.container}>
            <Text style={styles.text}>No places added...</Text>
        </View>
    }


    return <FlatList style={styles.list} data={places}
                     renderItem={({ item }) => <PlaceItem place={item}
                                                          onSelect={navigateToPlace} />
                     } keyExtractor={(item) => {
        item.id
    }} />
}

export default PlacesList


const styles = StyleSheet.create({
    list: { margin: 24 },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: Colors.primary200,
    },
})
