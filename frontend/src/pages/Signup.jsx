import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('MEMBER');

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          name,
          email,
          password,
          role
        }
      );

      alert('Signup Successful');

      navigate('/');

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        'Signup Failed'
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
          width: '380px',
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
          Signup
        </h1>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              marginBottom: '15px',
              borderRadius: '8px',
              border: 'none',
              background: '#334155',
              color: 'white'
            }}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: 'none',
              background: '#334155',
              color: 'white'
            }}
          >

            <option value="MEMBER">
              MEMBER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

          </select>

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
            Signup
          </button>

        </form>

        <p
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#cbd5e1'
          }}
        >
          Already have an account?
          {' '}
          <Link
            to="/"
            style={{
              color: '#38bdf8',
              textDecoration: 'none'
            }}
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;