import React from 'react';
import './App.css';
import logo from './assets/university-logo.png';
import cameraFeed from './assets/camera-feed.png';
import plateImage from './assets/plate-image.png';

const App = () => {
  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="University Logo" className="logo" />
          <h1>University of Southeastern Philippines</h1>
          <h2>Automatic Plate Number Recognition</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Camera Feed Section */}
        <div className="camera-view">
          <img src={cameraFeed} alt="Camera Feed" className="camera-image" />
        </div>

        {/* Plate Details Section */}
        <div className="details">
          {/* Plate Image */}
          <div className="plate-image">
            <img src={plateImage} alt="License Plate" className="plate-photo" />
          </div>

          {/* Information Section */}
          <div className="info">
            <p><strong>Plate Number:</strong> TIT 127</p>
            <p><strong>Date:</strong> 11/29/2024</p>
            <p><strong>Time:</strong> 7:49 PM</p>
          </div>
        </div>

        {/* History Section */}
        <div className="history">
          <h3>History</h3>
          <table>
            <thead>
              <tr>
                <th>Date (mm/dd/yyyy)</th>
                <th>Time</th>
                <th>Plate Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11/29/2024</td>
                <td>3:30 PM</td>
                <td>PQR 789</td>
              </tr>
              <tr>
                <td>11/29/2024</td>
                <td>4:45 PM</td>
                <td>VWX 470</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default App;
