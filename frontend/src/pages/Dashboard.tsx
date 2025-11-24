import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submissionsAPI } from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await submissionsAPI.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading your progress...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h1 className="page-title">📊 Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Questions Attempted</h3>
            <p className="blue">{stats?.attemptedQuestions || 0}</p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Keep solving!
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Questions Solved</h3>
            <p className="green">{stats?.solvedQuestions || 0}</p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Great progress!
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Success Rate</h3>
            <p className="purple">
              {stats?.attemptedQuestions > 0
                ? Math.round((stats.solvedQuestions / stats.attemptedQuestions) * 100)
                : 0}%
            </p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {stats?.attemptedQuestions > 0 ? 'Keep it up!' : 'Start solving!'}
            </div>
          </div>
        </div>

        <div className="card">
          <h2>📈 Category Progress</h2>
          {stats?.categoryStats && Object.keys(stats.categoryStats).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {Object.entries(stats.categoryStats).map(([category, data]: [string, any]) => (
                <div key={category}>
                  <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{category}</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {data.solved}/{data.attempted} solved
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    background: 'var(--bg-secondary)', 
                    borderRadius: '9999px',
                    height: '10px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{ 
                        background: 'linear-gradient(90deg, var(--primary) 0%, #8b5cf6 100%)',
                        height: '100%',
                        borderRadius: '9999px',
                        width: `${(data.solved / data.attempted) * 100}%`,
                        transition: 'width 0.5s ease'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                No submissions yet. Start solving questions!
              </p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/questions">
            <button 
              className="btn-primary" 
              style={{ 
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                borderRadius: '0.75rem'
              }}
            >
              🔥 Browse Questions
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
