import * as SQLite from 'expo-sqlite'
import { Place } from '../models/place'

const database = SQLite.openDatabase('places.db')

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL)`, [], () => {
                resolve()
            }, (_, error) => {
                reject(error)
            })
        })
    })

    return promise
}


export function insertPlace(place) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO places (title,imageUri,address,lat,lng
            ) VALUES (?,?,?,?,?)`, [place.title, place.imageUrl, place.address, place.location.lat, place.location.lng], (_, result) => {
                console.log(result)
                resolve(result)
            }, (_, error) => {
                reject(error)
            })
        })
    })
    return promise
}

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * from places`, [], (_, result) => {
                const places = []
                for (const key of result.rows._array) {
                    places.push(new Place(key.title, key.imageUrl, {
                        address: key.address,
                        lat: key.lat,
                        lng: key.lng,
                    }, key.id))
                }
                resolve(places)
            }, (_, error) => {
                reject(error)
            })
        })
    })
    return promise
}


export function fetchPlaceDetails(id) {
    const promise = new Promise(((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * from places WHERE id = ? `, [id], (_, result) => {
                const dbPLace = result.rows._array[0]
                const place = new Place(dbPLace.title, dbPLace.imageUrl, {
                    lat: dbPLace.lat,
                    lng: dbPLace.lng,
                    address: dbPLace.address,
                }, dbPLace.id)
                resolve(place)
            }, (_, error) => {
                reject(error)
            })
        })
    }))
    return promise
}