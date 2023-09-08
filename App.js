import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/ui/IconButton'
import { Colors } from './constants/colors'
import Map from './screens/Map'
import { useEffect, useState } from 'react'
import { init } from './util/database'
import AppLoading from 'expo-app-loading'
import PlaceDetails from './screens/PlaceDetails'


const Stack = createNativeStackNavigator()

export default function App() {
    const [dbStart, setDbStart] = useState(false)
    useEffect(() => {
        init().then(() => setDbStart(true)).catch(error => console.log(error))
    }, [])
    if (!dbStart) {
        return <AppLoading />
    }
    return (<>
            <StatusBar style={'dark'} />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: Colors.primary500 },
                        headerTintColor: Colors.gray700,
                        contentStyle: { backgroundColor: Colors.gray700 },
                    }}>
                    <Stack.Screen name={'AllPlaces'} component={AllPlaces} options={({ navigation }) => ({
                        // title: 'Favourite places',
                        headerRight: ({ tintColor }) => <IconButton icon={'add'} color={tintColor} size={24}
                                                                    onPress={() => {
                                                                        navigation.navigate('AddPlace')
                                                                    }} />
                        ,
                    })} />
                    <Stack.Screen name={'AddPlace'} component={AddPlace} options={{ title: 'Add a new place' }} />
                    <Stack.Screen name={'Map'} component={Map} />
                    <Stack.Screen name={'PlaceDetails'} component={PlaceDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        </>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
