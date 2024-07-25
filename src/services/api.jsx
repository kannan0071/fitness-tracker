const USER_KEY = 'user';
const GOALS_KEY = 'goals';

export const register = (email, password) => {
  const existingUser = JSON.parse(localStorage.getItem(USER_KEY));
  if (existingUser && existingUser.email === email) {
    return null;
  }
  const user = { email, password, profileName: '', profilePicture: '', height: 0, weight: 0, bmi: 0 };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const login = (email, password) => {
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  if (user && user.email === email && user.password === password) {
    return user;
  }
  return null;
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

export const updateUser = (updatedUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
};

export const getGoals = () => {
  const goals = localStorage.getItem(GOALS_KEY);
  return goals ? JSON.parse(goals) : [];
};

export const addGoal = (goal) => {
  const goals = getGoals();
  goals.push(goal);
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
};
