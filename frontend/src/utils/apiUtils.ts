import axios from "axios"
import { REST_API, VER } from "../Constants"

export const axiosFetchData = async(action :string): Promise<any> => {
    const url = REST_API + VER + action
    try {
      console.log('Fetching data from REST api', url)
      const response = await axios.get(url)
      if (response.status == 200) {
        return response.data
      } else {
        console.log('Response Not OK: ' + response.status + response.data)
        throw new Error('Network response was not ok');
      }
    } catch (error :any) {
      console.error('Fetch failed:' , error)
      throw error
    }
  }