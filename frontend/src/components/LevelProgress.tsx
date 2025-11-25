import React from 'react';

interface LevelProgressProps {
  level: number;
  levelTitle: string;
  currentXp: number;
  currentLevelXp: number;
  nextLevelXp: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  levelTitle,
  currentXp,
  currentLevelXp,
  nextLevelXp,
}) => {
  const progress = ((currentXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  return (
    <div
      style={{
        background: 'var(--bg-primary)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '2px solid var(--border)',
        boxShadow: '0 4px 12px var(--shadow)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            LEVEL {level}
          </div>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {levelTitle}
          </div>
        </div>
        <div
          style={{
            fontSize: '3rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            color: 'white',
          }}
        >
          {level}
        </div>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600 }}>{currentXp} XP</span>
          <span style={{ color: 'var(--text-secondary)' }}>{nextLevelXp} XP</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '12px',
            background: 'var(--bg-secondary)',
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              width: `${Math.min(progress, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--primary) 0%, #8b5cf6 100%)',
              transition: 'width 0.5s ease',
              borderRadius: '9999px',
            }}
          />
        </div>
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.75rem' }}>
        {nextLevelXp - currentXp} XP until next level
      </div>
    </div>
  );
};

export default LevelProgress;
