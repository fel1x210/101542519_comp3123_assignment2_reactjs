import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FloatingLines from './components/backgrounds/FloatingLines';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import ViewEmployee from './pages/ViewEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Background from reactbits */}
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
          <FloatingLines 
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={6}
            lineDistance={5}
            bendRadius={5.0}
            bendStrength={-0.5}
            mouseDamping={0.08}
            interactive={true}
            parallax={true}
            parallaxStrength={0.15}
            animationSpeed={1}
          />
        </div>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/view/:id" element={<ViewEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
