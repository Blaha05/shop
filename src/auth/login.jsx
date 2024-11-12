import './styles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const navigate = useNavigate();  Ініціалізація навігатора

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send the data to the FastAPI backend
    try {
      const response = await fetch('http://127.0.0.1:8000/auth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login here (e.g., redirect or save token)
        console.log('Login successful:', data);
        localStorage.setItem("accessToken", data);
        const token = localStorage.getItem("accessToken");
        console.log(token)
        //navigate('/'); 

      } else {
        // Handle login error here
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <center>
          <button type="submit" className="submit-btn">
            SEND
            <span></span>
          </button>
        </center>
      </form>
    </div>
  );
};

export default LoginBox;
