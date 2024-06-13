import axios from "axios";
import { useEffect, useState } from "react";
import { REST_API, TODOLIST, VER } from "../../Constants";
import { Table } from "react-bootstrap";

function TodoLists() {
  const [lists, setLists] = useState([]);

  const fetchLists = async(url :string) => {
    try {
      console.log('Fetching Lists from REST api', url)
      const response = await axios.get(url)
      if (response.status == 200) {
        setLists(response.data.data.map((todos :any) => todos.attributes))
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
      { lists.map((item :any, index) => (
        <Table striped hover key={item.id}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Notify At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{index}</td>
              <td>{item.name}</td>
              <td>{item.execute_at}</td>
            </tr>
          </tbody>
        </Table>
      ))}
    </>
  ); 
}

export default TodoLists