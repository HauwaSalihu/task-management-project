import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
<<<<<<< HEAD
import MainLayout from "./layout/MainLayout";
=======
import MainLayout from "./layout/MainLayout.jsx";
>>>>>>> 1f894fe58248043efee6a9e815268bd60dbaf19d
import Task from "./pages/Task";
import ProtectedRoute from "./layout/ProtetedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Task />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
