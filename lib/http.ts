import axios from 'axios'
import { FunkoResponseProps, GeolocationProps } from 'const/interfaces'
import { getGeolocation } from './geolocalization'

export async function fetchFunkos(search: string): Promise<{ data?: FunkoResponseProps, error?: any }> {
  try {
    const geolocation: GeolocationProps = await getGeolocation()
    const response = await axios.get(`FunkoTraker/api/funkos?search=${search}&latitude=${geolocation.latitude}&longitude=${geolocation.longitude}`)
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`)
    }
    return { data: response.data }
  } catch (error) {
    console.error(error)
    return { error }
  }
}