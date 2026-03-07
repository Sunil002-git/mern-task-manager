import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import TeamTasks from "./pages/TeamTasks";
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
             <Dashboard />
          </ProtectedRoute>
         } />
         <Route path="/teams" element={
            <ProtectedRoute>
              <Teams />
         </ProtectedRoute>
         } />
         <Route path="/teams/:id" element={
            <ProtectedRoute>
              <TeamTasks />
            </ProtectedRoute>
         } />
         
      </Routes>
    </BrowserRouter>
  );
}
export default App;
