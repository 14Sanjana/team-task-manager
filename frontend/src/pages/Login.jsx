import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password
        }
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      navigate('/dashboard');

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        'Login Failed'
      );

    }
  };

  return (

    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0f172a',
        fontFamily: 'Arial'
      }}
    >

      <div
        style={{
          width: '350px',
          background: '#1e293b',
          padding: '35px',
          borderRadius: '15px',
          boxShadow: '0 0 20px rgba(56,189,248,0.2)'
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            color: '#38bdf8',
            marginBottom: '30px'
          }}
        >
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: 'none',
              background: '#334155',
              color: 'white'
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: 'none',
              background: '#334155',
              color: 'white'
            }}
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#38bdf8',
              border: 'none',
              borderRadius: '8px',
              color: '#0f172a',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Login
          </button>

        </form>

        <p
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#cbd5e1'
          }}
        >
          Don’t have an account?
          {' '}
          <Link
            to="/signup"
            style={{
              color: '#38bdf8',
              textDecoration: 'none'
            }}
          >
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;