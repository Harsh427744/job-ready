import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div>
          <h2>Create your account</h2>
          <p style={{ textAlign: 'center', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          {error && <div className="error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Must be at least 6 characters
            </p>
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Creating account...' : '🚀 Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
