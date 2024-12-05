// App.js
import React from 'react';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-logo">
          <img src="/university-logo.png" alt="University Logo" className="logo" />
          <h1>University of Southeastern Philippines</h1>
          <h2>Automatic Plate Number Recognition</h2>
        </div>
      </header>

      <main className="main-content">
        <div className="camera-view">
          <img
            src="/camera-feed.png"
            alt="Camera Feed"
            className="camera-image"
          />
        </div>

        <div className="details">
          <div className="plate-image">
            <img
              src="/plate-image.png"
              alt="License Plate"
              className="plate-photo"
            />
          </div>

          <div className="info">
            <p><strong>Plate Number:</strong> TIT 127</p>
            <p><strong>Date:</strong> 11/29/2024</p>
            <p><strong>Time:</strong> 7:49 PM</p>
          </div>
        </div>

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
