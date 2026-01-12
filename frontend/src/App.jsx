import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
//import FacultyDashboard from './pages/FacultyDashboard';
//import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/*<Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;