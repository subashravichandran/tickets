import {Route, Routes} from 'react-router-dom';
import TodoLists from './Todo/TodoLists';

function AppRoutes() {
  return (
    <Routes>
      <Route path='/todo_lists' element={<TodoLists/>} />
    </Routes>
  );
}

export default AppRoutes