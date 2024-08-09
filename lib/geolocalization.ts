import { GeolocationProps } from "const/interfaces"

export const getGeolocation = async (): Promise<GeolocationProps> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                },
                (error) => {
                    reject(error)
                }
            )
        } else {
            reject(new Error('Geolocation not supported'))
        }
    })
}