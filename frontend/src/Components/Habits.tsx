import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import TitleWithButton, { Mandate } from "./common/TitleWithButton";
import { useState } from "react";
import { axiosPostData } from "../utils/apiUtils";

function Habits() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [habitName, setHabitName] = useState<string>('')
  const [habitNameError, setHabitNameError] = useState<string>('')

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
    </>
  );
}

export default Habits