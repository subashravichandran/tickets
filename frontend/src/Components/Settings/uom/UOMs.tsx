import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import { axiosFetchData, axiosPatchData, axiosPostData } from "../../../utils/apiUtils";
import { UOM_LIST } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, FormLabel, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import TitleWithButton from "../../common/TitleWithButton";

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
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState<boolean>(false)
    const [uomNameError, setUomNameError] = useState<string>('')
    const [uomAbbrError, setUomAbbrError] = useState<string>('')

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
        try {
          const response = await axiosPatchData(url, updatedUom);
          const updatedLists = [...lists];
          updatedLists[editClickedItem] = response;
          setLists(updatedLists);
        } catch (error) {
          console.error('Failed to update UOM:', error);
        }
      }
      setEditClickedItem(null)
    }

    const handleCreateUom = async() => {
      if(uomName.length != 0 && uomAbbr.length != 0 && uomAbbr.length <= 3) {
        const newUom = {name: uomName, abbreviation: uomAbbr}
        const url = `/count_measures`

        try {
          const response = await axiosPostData(url, newUom)
          setLists([...lists, response])
          setShowCreateModal(false)
        } catch (error) {
          console.log('Failed to create UOM:', error)
        }
      }
    }

    const handleNameChange = (name :string) =>{
      setUomName(name)
      setIsSaveBtnDisabled(name.length == 0 || (uomAbbr.length > 3 || uomAbbr.length == 0))
    }

    const handleAbbrChange= (str :string) => {
      setUomAbbr(str)
      setIsSaveBtnDisabled(str.length > 3 || str.length == 0 || uomName.length == 0)
    }

    const handleNewButton = () => {
      setUomName('')
      setUomAbbr('')
      setUomNameError('')
      setUomAbbrError('')
      setShowCreateModal(true)
    }

    const handleNewUomChange = (name :string) => {
      setUomName(name)
      setUomNameError(name.length == 0 ? 'Name cannot be blank.' : '')
    }

    const handleNewAbbrChange = (abbr :string) => {
      setUomAbbr(abbr)
      if(abbr.length == 0) {
        setUomAbbrError('Abbreviation cannot be blank')
      } else if(abbr.length > 3) {
        setUomAbbrError('Abbreviation length cannot be more than 3')
      } else {
        setUomAbbrError('')
      }
    }

    const buttons = (
      <>
        <Button variant="success" onClick={handleNewButton}>New</Button>
      </>
    )

    const renderTooltip = (props :any) => (
      <Tooltip id="button-tooltip">
        { props.name_invalid && "Name cannot be blank" }
        { props.name_invalid && <br/> }
        { props.abbr_length == 0 && 'Abbreviation cannot be blank' }
        { props.abbr_length > 3 && 'Abbreviation length cannot be more than 3'}
      </Tooltip>
    );

    return (
      <>
        <TitleWithButton title='Unit of Measures' buttons={buttons} />
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
                                                              onChange={ (e) => handleNameChange(e.target.value)}
                                                              id='uom_name' />
                                              : item.name 
                  }
                </td>
                <td>
                  { editClickedItem === index ? <Form.Control type="text"
                                                              defaultValue={item.abbreviation}
                                                              onChange={ (e) => handleAbbrChange(e.target.value)}
                                                              id='uom_abbr'/>
                                              : item.abbreviation
                  }
                </td>
                <th className='action-3-h'>
                  <FontAwesomeIcon icon={faPenClip}
                                   onClick={ ()=> handleEditIconClick(index, item.name, item.abbreviation) }
                                   style={{ cursor: 'pointer'}} />{' '}
                  { editClickedItem === index ? <>
                                                  <OverlayTrigger
                                                    placement="top"
                                                    overlay={isSaveBtnDisabled ? renderTooltip({name_invalid: uomName.length == 0, abbr_length: uomAbbr.length })
                                                                               : <></>}
                                                  >
                                                    <span>
                                                      <Button variant={isSaveBtnDisabled ? "secondary" : "success"}
                                                              onClick={ () => handleUomUpdate('save') }
                                                              disabled={isSaveBtnDisabled}>Save</Button>{' '}
                                                    </span>
                                                  </OverlayTrigger>
                                                  <Button variant="danger" onClick={ () => handleUomUpdate('cancel') }>Cancel</Button>
                                                </>
                                              : null }
                </th>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New UOM</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUomName">
                <Form.Label>Name<span className="mandatory-field"> *</span></Form.Label>
                <Form.Control type='text'
                              placeholder="UOM Name"
                              value={uomName}
                              onChange={(e) => handleNewUomChange(e.target.value)}
                />
                <Form.Text className="text-danger">{ uomNameError }</Form.Text>
              </Form.Group>
              <Form.Group controlId="formUomAbbr">
                <Form.Label>Abbreviation<span className="mandatory-field"> *</span></Form.Label>
                <Form.Control type='text'
                              placeholder="Abbreviation"
                              value={uomAbbr}
                              onChange={(e) => handleNewAbbrChange(e.target.value)}
                />
                <Form.Text className="text-danger">{ uomAbbrError }</Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success"
                    onClick={handleCreateUom}
                    disabled={uomName.length == 0 || uomAbbr.length == 0 || uomAbbr.length > 3 }>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    ); 
}

export default UOMs