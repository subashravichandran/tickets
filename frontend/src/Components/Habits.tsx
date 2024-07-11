import { Button, Form, FormGroup, Modal, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import TitleWithButton, { Mandate } from "./common/TitleWithButton";
import { useEffect, useState } from "react";
import { axiosFetchData, axiosPatchData, axiosPostData } from "../utils/apiUtils";
import { HABITS_LIST } from "../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenClip } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";

interface HabitsItem {
  id: number;
  name: string;
  streak: number;
}

function Habits() {
  const [lists, setLists] = useState<HabitsItem[]>([])
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [habitName, setHabitName] = useState<string>('')
  const [habitNameError, setHabitNameError] = useState<string>('')
  const [editIconClickedForItem, setEditIconClickedForItem] = useState<number | null>(null)

  const validateName = (name: string) => { setHabitNameError(name.length == 0 ? 'Name cannot be blank' : '') }
  const handleNewButton = () => {
    setShowCreateModal(true)
    setHabitName('')
  }
  const habitNameChangeHandler = (name :string) => {
    setHabitName(name)
    validateName(name)
  }
  const handleCreateHabit = async() => {
    if (habitName.length != 0 ) {
      const url = `/habits`
      const newHabit = { name: habitName, streak: 0 }
      try {
        const response = await axiosPostData(url, newHabit)
        setShowCreateModal(false)
        console.log(response)
      } catch (error) {
        console.error('failed to create habit', error);
      }
    }
  }

  const buttons = ( <><Button variant="success" onClick={ handleNewButton }>New</Button></> )

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosFetchData(HABITS_LIST)
      setLists(data)
    }
    fetchData();
  }, [])

  const handleEditIconClick = (index: number) => {
    setEditIconClickedForItem(index)
  }

  const handleHabitUpdate = async() => {
    if (editIconClickedForItem !== null && habitName != '') {
      const updatedHabit = { name: habitName }
      const url = `/habits/${lists[editIconClickedForItem].id}`
      try {
        const response = await axiosPatchData(url, updatedHabit);
        const updatedLists = [...lists];
        updatedLists[editIconClickedForItem] = response;
        setLists(updatedLists);
      } catch (error) {
        console.error('Failed to update Habit:', error);
      }
    }
    setEditIconClickedForItem(null)
  }
  return (
    <>
      <TitleWithButton title="Habits" buttons={buttons} />
      <Modal show={showCreateModal} onHide = { () => setShowCreateModal(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Create a new Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="formHabitName">
              <Form.Label>Name<Mandate /></Form.Label>
              <Form.Control type='text'
                            placeholder="Habit Name"
                            onChange={ (e) => habitNameChangeHandler(e.target.value) }
              />
              <Form.Text className="text-danger">{ habitNameError }</Form.Text>
            </FormGroup>
            <FormGroup controlId="formHabitStreak">
              <Form.Label>Streak</Form.Label>
              <Form.Control type='number' value={0} disabled/>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success"
                  onClick={ handleCreateHabit }
                  disabled={ habitName.length == 0 }>Create</Button>
        </Modal.Footer>
      </Modal>
      <Table striped hover className="serial-numbered-with-name">
        <thead>
          <tr>
            <th>#</th>
            <th>Habit</th>
            <th>Streak</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { lists.map((item: any, index) => (
            <tr key={item.id}>
              <td>{ index + 1 }</td>
              <td>{ editIconClickedForItem === index ? <Form.Control type="text"
                                                    defaultValue={item.name}
                                                    onChange={ (e) => habitNameChangeHandler(e.target.value)}
                                                    id='habit_name'/> : item.name }</td>
              <td>{ item.streak }</td>
              <td className='action-2-h'>
                  { editIconClickedForItem === null && <FontAwesomeIcon icon={faPenClip}
                                   onClick={ (_e) => handleEditIconClick(index) } />}{' '}
                  { editIconClickedForItem === index ? <>
                                                  <OverlayTrigger placement="top"
                                                                  overlay={ habitNameError.length != 0 ? <Tooltip id="button-tooltip">
                                                                                                           Name Cannot be blank
                                                                                                         </Tooltip>
                                                                                                       : <></>}
                                                  >
                                                    <span>
                                                      <Button variant={ habitNameError.length == 0 ? 'success' : 'secondary' }
                                                              onClick={ () => handleHabitUpdate() }
                                                              disabled={ habitNameError.length != 0 }>Save</Button>{' '}
                                                    </span>
                                                  </OverlayTrigger>
                                                  <Button variant="danger" onClick={ (_e) => setEditIconClickedForItem(null) }>Cancel</Button>
                                                </>
                                              : null }
              </td>
              <td className="action-1-h">
                <LinkContainer to='/activities'>
                  <Button variant="success">Log</Button>
                </LinkContainer>
              </td>
            </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default Habits