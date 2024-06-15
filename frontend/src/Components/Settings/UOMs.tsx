import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { axiosFetchData } from "../../utils/apiUtils";
import { UOM_LIST } from "../../Constants";

function UOMs () {
    const [lists, setLists] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const data = await axiosFetchData(UOM_LIST)
        setLists(data)
      }
      fetchData();
    }, [])
  
    return (
      <>
        <p className='context-title'>Unit of Measures</p>
        { lists.map((item :any, index) => (
          <Table striped hover key={item.id}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
              </tr>
            </tbody>
          </Table>
        ))}
      </>
    ); 
}

export default UOMs