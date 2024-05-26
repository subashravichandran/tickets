import axios from "axios";
import { useEffect, useState } from "react";
import { REST_API, TODOLIST, VER } from "../../Constants";

function TodoLists() {
  const [lists, setLists] = useState([]);

  const fetchLists = async(url :string) => {
    try {
      console.log('Fetching Lists from REST api', url)
      const response = await axios.get(url)
      if (response.status == 200) {
        setLists(response.data)
      } else {
        console.log('REST API Error response: ' + response.status + response.data)
      }
    } catch (error :any) {
      console.log('Error caught:' , error)
    }
  }

  useEffect(() => {
    fetchLists(REST_API + VER + TODOLIST)
  }, [])

  return (
    <>
      <h2>Todo</h2>
      { lists.map((item :any) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.execute_at}</p>
        </div>
      ))}
    </>
  ); 
}

export default TodoLists