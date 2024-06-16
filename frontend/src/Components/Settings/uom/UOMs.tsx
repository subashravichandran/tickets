import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { axiosFetchData, axiosPatch } from "../../../utils/apiUtils";
import { UOM_LIST } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { Button, Form} from "react-bootstrap";

// Defining the types for the UOM item
interface UOMItem {
  id: number;
  name: string;
  abbreviation: string;
}

function UOMs () {
    const [lists, setLists] = useState<UOMItem[]>([]);
    const [uomName, setUomName] = useState<string>('')
    const [uomAbbr, setUomAbbr] = useState<string>('')
    const [editClickedItem, setEditClickedItem] = useState<number | null>(null)

    useEffect(() => {
      const fetchData = async () => {
        const data = await axiosFetchData(UOM_LIST)
        setLists(data)
      }
      fetchData();
    }, [])
  
    const handleEditIconClick = (index: number, name: string, abbr: string) => {
      setEditClickedItem(index)
      setUomName(name)
      setUomAbbr(abbr)
    }

    const handleUomUpdate = async (action :String) => {
      if (action === 'save' && editClickedItem !== null) {
        const updatedUom = {
          name: uomName,
          abbreviation: uomAbbr
        }
        const url = `/count_measures/${lists[editClickedItem].id}`
        axiosPatch(url, updatedUom)
        try {
          const response = await axiosPatch(url, updatedUom);
          const updatedLists = [...lists];
          updatedLists[editClickedItem] = response;
          setLists(updatedLists);
        } catch (error) {
          console.error('Failed to update UOM:', error);
        }
      }
      setEditClickedItem(null)
    }

    return (
      <>
        <p className='context-title'>Unit of Measures</p>
        <Table striped hover className="serial-numbered-with-name">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Abbreviation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { lists.map((item :any, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  { editClickedItem === index ? <Form.Control type="text"
                                                              defaultValue={item.name}
                                                              onChange={ (e) => setUomName(e.target.value)}
                                                              id='uom_name' />
                                              : item.name 
                  }
                </td>
                <td>
                  { editClickedItem === index ? <Form.Control type="text"
                                                              defaultValue={item.abbreviation}
                                                              onChange={ (e) => setUomAbbr(e.target.value)}
                                                              id='uom_abbr'/>
                                              : item.abbreviation
                  }
                </td>
                <th className='action-3-h'>
                  <FontAwesomeIcon icon={faPenClip}
                                   onClick={ ()=> handleEditIconClick(index, item.name, item.abbreviation) }
                                   style={{ cursor: 'pointer'}} />{' '}
                  { editClickedItem === index ? <>
                                                  <Button variant="success" onClick={ () => handleUomUpdate('save') }>Save</Button>{' '}
                                                  <Button variant="danger" onClick={ () => handleUomUpdate('cancel') }>Cancel</Button>
                                                </>
                                              : null }
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    ); 
}

export default UOMs