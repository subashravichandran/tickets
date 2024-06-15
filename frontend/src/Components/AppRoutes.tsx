import { lazy, Suspense } from "react"
import {Route, Routes} from 'react-router-dom';

// Lazy imports
// instead of loading all the imports which might not be used lazy import only the clicked routes
// This way performance is improved better when the application grows
const TodoLists = lazy(() => import("./Todo/TodoLists"))
const UOMs= lazy(() => import("./Settings/UOMs.tsx"))

function AppRoutes() {
  return (
    // TODO: Loading screen design to be done
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/todo_lists' element={<TodoLists />} />
        <Route path='/uoms' element={<UOMs />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes