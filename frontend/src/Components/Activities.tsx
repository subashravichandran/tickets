import { useEffect, useState } from "react";
import TitleWithButton from "./common/TitleWithButton";
import { axiosFetchData } from "../utils/apiUtils";
import { HABIT_ACTIVITES_LIST } from "../Constants";
import { DisplayTable } from "./common/DisplayTable";
import { displayDateFormat } from "../utils/dateUtils";

interface ActivitiesItem {
  id: Number;
  activity_count: Number;
  created_at: Date;
}

function Activities () {
  const [activitiesList, setActivitiesList] = useState<ActivitiesItem[]>([])
  const headers = {'log': 'Logs'}

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosFetchData(HABIT_ACTIVITES_LIST)
      setActivitiesList(data)
    }
    fetchData();
  }, [])
  
  return (
    <>
      <TitleWithButton title="Activities" buttons='' />
      <DisplayTable headers={ headers }
                    rows={ activitiesList.map((activity) => (
                             { log: `Spent ${activity.activity_count} hours on ${displayDateFormat(activity.created_at)}` }
                           )) }/>
    </>
  );
}

export default Activities