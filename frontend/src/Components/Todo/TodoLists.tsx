import { useEffect, useState } from "react";
import { TODOLIST } from "../../Constants";
import { Table } from "react-bootstrap";
import { axiosFetchData } from "../../utils/apiUtils";

function TodoLists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosFetchData(TODOLIST)
      setLists(data.data.map((todos :any) => todos.attributes))
    }
    fetchData();
  }, [])

  return (
    <>
      <p className='context-title'>Todo Items</p>
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
              <td>{index + 1}</td>
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