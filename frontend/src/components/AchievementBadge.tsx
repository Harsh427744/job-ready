import React from 'react';

const ACHIEVEMENTS = {
  'first-blood': { icon: '🎯', name: 'First Blood', description: 'Solved your first question' },
  'speed-demon': { icon: '⚡', name: 'Speed Demon', description: 'Solved 5 questions in one day' },
  'problem-solver': { icon: '🧩', name: 'Problem Solver', description: 'Solved 10 questions' },
  'centurion': { icon: '💯', name: 'Centurion', description: 'Solved 100 questions' },
  'week-warrior': { icon: '🔥', name: 'Week Warrior', description: '7-day streak' },
  'month-master': { icon: '👑', name: 'Month Master', description: '30-day streak' },
};

interface AchievementBadgeProps {
  achievementId: string;
  size?: 'small' | 'medium' | 'large';
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievementId, size = 'medium' }) => {
  const achievement = ACHIEVEMENTS[achievementId as keyof typeof ACHIEVEMENTS];
  
  if (!achievement) return null;

  const sizes = {
    small: { container: '60px', icon: '24px', fontSize: '0.75rem' },
    medium: { container: '80px', icon: '32px', fontSize: '0.875rem' },
    large: { container: '120px', icon: '48px', fontSize: '1rem' },
  };

  return (
    <div
      style={{
        width: sizes[size].container,
        padding: '0.75rem',
        background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
        borderRadius: '1rem',
        textAlign: 'center',
        border: '2px solid var(--border)',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      }}
      title={achievement.description}
    >
      <div style={{ fontSize: sizes[size].icon, marginBottom: '0.25rem' }}>
        {achievement.icon}
      </div>
      <div
        style={{
          fontSize: sizes[size].fontSize,
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.2,
        }}
      >
        {achievement.name}
      </div>
    </div>
  );
};

export default AchievementBadge;
