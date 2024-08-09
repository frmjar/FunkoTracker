import axios from 'axios'
import { FunkoResponseProps } from 'const/interfaces'

export async function fetchFunkos(search: string): Promise<{ data?: FunkoResponseProps, error?: any }> {
  try {
    const response = await axios.get(`/api/funkos?search=${search}&gl='es'`)
    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`)
    }
    return { data: response.data }
  } catch (error) {
    console.error(error)
    return { error }
  }
}