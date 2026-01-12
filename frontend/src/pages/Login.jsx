import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('FACULTY');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'FACULTY') {
      //navigate('/faculty');
    } else {
      //navigate('/manager');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to manage Auditorium bookings</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="FACULTY">Faculty Member</option>
              <option value="MANAGER">Auditorium Manager</option>
            </select>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}