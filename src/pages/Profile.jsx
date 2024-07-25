import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getUser, updateUser } from '../services/api';

const Profile = () => {
  const { user, setUser } = useContext(AppContext);
  const [profileName, setProfileName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setProfileName(storedUser.profileName);
      setProfilePicture(storedUser.profilePicture);
      setHeight(storedUser.height);
      setWeight(storedUser.weight);
      setBmi(storedUser.bmi);
    }
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    const updatedUser = { ...user, profileName, profilePicture, height, weight, bmi };
    setUser(updatedUser);
    updateUser(updatedUser);
    navigate('/dashboard');
  };

  useEffect(() => {
    if (height && weight) {
      const calculatedBmi = (weight / ((height / 100) ** 2)).toFixed(2);
      setBmi(calculatedBmi);
    }
  }, [height, weight]);

  return (
    <div className="container">
      <h1>Profile</h1>
      <div>
        <label>Profile Name:</label>
        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
      </div><br />
      <div>
        <label>Profile Picture:</label>
        <input
          type="file"
          onChange={handlePictureChange}
        />
        {profilePicture && <img src={profilePicture} alt="Profile" />}
      </div><br />
      <div>
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div><br />
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div><br />
      <div>
        <label>BMI: {bmi}</label>
        <input
          type="number"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
        />
      </div><br />
      <button onClick={handleProfileSave}>Save Profile</button>
    </div>
  );
};

export default Profile;
