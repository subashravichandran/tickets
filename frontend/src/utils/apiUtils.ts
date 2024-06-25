import axios from "axios"
import { REST_API, VER } from "../Constants"

export const axiosFetchData = async(action :string): Promise<any> => {
  const url_with_version = REST_API + VER + action
  try {
    console.log('Fetching data from REST api', url_with_version)
    const response = await axios.get(url_with_version)
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

export const axiosPatchData = async(url :string, data :any) => {
  const url_with_version = REST_API + VER + url
  try {
    console.log('Patching data to REST api', url_with_version)
    const response = await axios.patch(url_with_version, data);
    if (response.status === 200) {
      return response.data
    } else {
      console.log('Response Not OK: ' + response.status + response.data)
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Patch failed:', error);
    throw error
  }
}

export const axiosPostData = async(url :string, data :any): Promise<any> => {
  const url_with_version = REST_API + VER + url
  try {
    console.log('Posting data to REST api', url_with_version)
    const response = await axios.post(url_with_version, data);
    if (response.status === 201) {
      return response.data
    } else {
      console.log('Response Not OK: ' + response.status + response.data)
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Post failed:', error);
    throw error
  }
}