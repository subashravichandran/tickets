import {Route, Routes} from 'react-router-dom';
import HabitsList from './Habits/HabitsList';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HabitsList/>} />
    </Routes>
  );
}

export default AppRoutes