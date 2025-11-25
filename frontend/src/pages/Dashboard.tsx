import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submissionsAPI } from '../services/api';
import { Stats } from '../types';
import LevelProgress from '../components/LevelProgress';
import AchievementBadge from '../components/AchievementBadge';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
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
    return <div className="loading">⏳ Loading your progress...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)', paddingBottom: '3rem' }}>
      <div className="container">
        <h1 className="page-title">⚔️ Warrior Dashboard</h1>

        {/* Streak Counter */}
        {stats && stats.streak > 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
              borderRadius: '1rem',
              padding: '1.5rem',
              marginBottom: '2rem',
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔥</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {stats.streak} Day Streak!
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginTop: '0.25rem' }}>
              Keep it going! Solve a question today to maintain your streak.
            </div>
          </div>
        )}

        {/* Level Progress */}
        {stats && (
          <div style={{ marginBottom: '2rem' }}>
            <LevelProgress
              level={stats.level}
              levelTitle={stats.levelTitle}
              currentXp={stats.xp}
              currentLevelXp={stats.currentLevelXp}
              nextLevelXp={stats.nextLevelXp}
            />
          </div>
        )}

        {/* Stats Grid */}
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
              Great progress! 🎯
            </div>
          </div>

          <div className="stat-card">
            <h3>Success Rate</h3>
            <p className="purple">
              {stats?.attemptedQuestions && stats.attemptedQuestions > 0
                ? Math.round((stats.solvedQuestions / stats.attemptedQuestions) * 100)
                : 0}%
            </p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {stats?.attemptedQuestions && stats.attemptedQuestions > 0 ? 'Excellent!' : 'Start solving!'}
            </div>
          </div>

          <div className="stat-card">
            <h3>Total XP</h3>
            <p className="purple">{stats?.xp || 0}</p>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Experience Points ⭐
            </div>
          </div>
        </div>

        {/* Achievements */}
        {stats && stats.achievements && stats.achievements.length > 0 && (
          <div className="card">
            <h2>🏆 Achievements Unlocked</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '1rem',
              }}
            >
              {stats.achievements.map((achievement) => (
                <AchievementBadge key={achievement} achievementId={achievement} size="medium" />
              ))}
            </div>
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
              }}
            >
              🎮 {stats.achievements.length} of 6 achievements unlocked! Keep grinding!
            </div>
          </div>
        )}

        {/* Category Progress */}
        <div className="card">
          <h2>📈 Category Progress</h2>
          {stats?.categoryStats && Object.keys(stats.categoryStats).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {Object.entries(stats.categoryStats).map(([category, data]) => (
                <div key={category}>
                  <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{category}</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {data.solved}/{data.attempted} solved
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      background: 'var(--bg-secondary)',
                      borderRadius: '9999px',
                      height: '10px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div
                      style={{
                        background: 'linear-gradient(90deg, var(--primary) 0%, #8b5cf6 100%)',
                        height: '100%',
                        borderRadius: '9999px',
                        width: `${(data.solved / data.attempted) * 100}%`,
                        transition: 'width 0.5s ease',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '3rem',
                color: 'var(--text-secondary)',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                No submissions yet. Start your coding journey!
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/questions">
            <button
              className="btn-primary"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
              }}
            >
              🔥 Start Grinding
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
