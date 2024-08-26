import { useEffect, useState } from "react";
import TitleWithButton from "./common/TitleWithButton";
import { axiosFetchData, axiosPostData } from "../utils/apiUtils";
import { HABIT_ACTIVITES_LIST, HABITS_LIST } from "../Constants";
import { DisplayTable } from "./common/DisplayTable";
import { displayDateFormat } from "../utils/dateUtils";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface ActivitiesItem {
  id: Number;
  activity_count: Number;
  created_at: Date;
}

function Activities () {
  const { habitId } = useParams<{ habitId: string }>();
  const [activitiesList, setActivitiesList] = useState<ActivitiesItem[]>([])
  const [timeSpent, setTimeSpent] = useState<number>(1)
  const headers = {'log': 'Logs'}

  const fetchData = async () => {
    const data = await axiosFetchData(HABITS_LIST + `/${habitId}/` + HABIT_ACTIVITES_LIST )
    setActivitiesList(data)
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  const createHabitActivity = async() => {
    const habit_activity_params = { habit_id: habitId, activity_count: timeSpent }
    try {
      await axiosPostData(HABITS_LIST + `/${habitId}/habit_activities`, habit_activity_params)
      fetchData();
    } catch(error) {
      console.error('failed to create habit_activity', error)
    }
  }

  return (
    <>
      <TitleWithButton title="Activities" buttons='' />
      <Form>
        <Form.Label>Time Spent</Form.Label>{' '}
        <Form.Control type="number"
                      value={timeSpent}
                      id="newActivityCount"
                      onChange={ (e) => setTimeSpent(Number(e.target.value))}
                      style={{ display: 'inline-block', width: '5%' }} />{' hours '}
      </Form>
      <Button variant={ 'success' } onClick={ () => createHabitActivity() }>Save</Button>{' '}
      <DisplayTable headers={ headers }
                    rows={ activitiesList.map((activity) => (
                             { log: `Spent ${activity.activity_count} hours on ${displayDateFormat(activity.created_at)}` }
                           )) }/>
    </>
  );
}

export default Activities