export const XP_VALUES = {
  Easy: 10,
  Medium: 25,
  Hard: 50,
};

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: 'Newbie' },
  { level: 2, xp: 100, title: 'Beginner' },
  { level: 3, xp: 250, title: 'Learner' },
  { level: 4, xp: 500, title: 'Intermediate' },
  { level: 5, xp: 1000, title: 'Advanced' },
  { level: 6, xp: 2000, title: 'Expert' },
  { level: 7, xp: 3500, title: 'Master' },
  { level: 8, xp: 5500, title: 'Grandmaster' },
  { level: 9, xp: 8000, title: 'Legend' },
  { level: 10, xp: 12000, title: 'Mythic' },
];

export const calculateLevel = (xp: number): { level: number; title: string; nextLevelXp: number; currentLevelXp: number } => {
  let currentLevel = LEVEL_THRESHOLDS[0];
  let nextLevel = LEVEL_THRESHOLDS[1];

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      currentLevel = LEVEL_THRESHOLDS[i];
      nextLevel = LEVEL_THRESHOLDS[i + 1] || { level: currentLevel.level, xp: currentLevel.xp, title: currentLevel.title };
      break;
    }
  }

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    nextLevelXp: nextLevel.xp,
    currentLevelXp: currentLevel.xp,
  };
};

export const checkAchievements = (user: any, submissions: any[]): string[] => {
  const newAchievements: string[] = [];

  // First Blood
  if (submissions.length === 1 && !user.achievements.includes('first-blood')) {
    newAchievements.push('first-blood');
  }

  // Speed Demon - 5 questions in one day
  const today = new Date().toDateString();
  const todaySubmissions = submissions.filter((s: any) => 
    new Date(s.submittedAt).toDateString() === today
  );
  if (todaySubmissions.length >= 5 && !user.achievements.includes('speed-demon')) {
    newAchievements.push('speed-demon');
  }

  // Problem Solver - 10 questions solved
  const solvedCount = submissions.filter((s: any) => s.status === 'solved').length;
  if (solvedCount >= 10 && !user.achievements.includes('problem-solver')) {
    newAchievements.push('problem-solver');
  }

  // Centurion - 100 questions solved
  if (solvedCount >= 100 && !user.achievements.includes('centurion')) {
    newAchievements.push('centurion');
  }

  // Week Warrior - 7 day streak
  if (user.streak >= 7 && !user.achievements.includes('week-warrior')) {
    newAchievements.push('week-warrior');
  }

  // Month Master - 30 day streak
  if (user.streak >= 30 && !user.achievements.includes('month-master')) {
    newAchievements.push('month-master');
  }

  return newAchievements;
};
