import React, { useState, useEffect } from 'react';
import { addGoal, getGoals } from '../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [calories, setCalories] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (calories && workoutType && duration) {
      addGoal({ calories: parseInt(calories), workoutType, duration: parseInt(duration) });
      setGoals(getGoals());
      setCalories('');
      setWorkoutType('');
      setDuration('');
    }
  };

  const workoutTypes = [...new Set(goals.map(goal => goal.workoutType))];
  const chartData = {
    labels: workoutTypes,
    datasets: [
      {
        label: 'Calories',
        data: workoutTypes.map(type => 
          goals
            .filter(goal => goal.workoutType === type)
            .reduce((acc, goal) => acc + goal.calories, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Duration (mins)',
        data: workoutTypes.map(type => 
          goals
            .filter(goal => goal.workoutType === type)
            .reduce((acc, goal) => acc + goal.duration, 0)
        ),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="container">
      <h1>Track your progress</h1>
      <form onSubmit={handleAddGoal}>
        <input
          type="number"
          placeholder="Calories to Burn"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <input
          type="text"
          placeholder="Workout Type"
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (mins)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button type="submit">Add Goal</button>
      </form>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
