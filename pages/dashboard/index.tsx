import React from 'react';

const Dashboard: React.FC = () => {
  // Inline styles
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
  };

  const logoStyle: React.CSSProperties = {
    width: '40px', // Smaller logo width
    height: '40px', // Smaller logo height
    marginRight: '10px',
    backgroundColor: 'transparent',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#800000', // Maroon Red
    color: 'white',
    padding: '15px 20px',
    borderBottom: '5px solid #f1c40f',
    justifyContent: 'space-between',
  };

  const headerTitleContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const headerTitleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
  };

  const headerSubtitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bolder',
    margin: '5px 0 0 0',
  };

  const aboutButtonStyle: React.CSSProperties = {
    backgroundColor: '#f1c40f',
    color: '#800000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    marginTop: '20px',
  };

  const videoContainerStyle: React.CSSProperties = {
    width: '50%',
    backgroundColor: 'black',
    height: '350px',
    position: 'relative',
  };

  const licensePlateContainerStyle: React.CSSProperties = {
    width: '50%',
    height: '350px',
    backgroundColor: '#ecf0f1',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const historySectionStyle: React.CSSProperties = {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const historyTableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const historyTableHeaderStyle: React.CSSProperties = {
    textAlign: 'left',
    fontWeight: 'bold',
    padding: '10px',
    backgroundColor: '#800000', // Maroon Red
    color: 'white',
  };

  const historyTableRowStyle: React.CSSProperties = {
    borderBottom: '1px solid #ddd',
  };

  const historyTableDataStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'left',
  };

  const historyTableTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const sampleHistory = [
    { plateNumber: 'PQR 789', date: '11/29/2024', time: '3:30 PM' },
    { plateNumber: 'VWX 470', date: '11/29/2024', time: '4:45 PM' },
    { plateNumber: 'ABC 123', date: '11/28/2024', time: '1:15 PM' },
    { plateNumber: 'XYZ 890', date: '11/28/2024', time: '2:45 PM' },
    { plateNumber: 'LMN 456', date: '11/27/2024', time: '11:00 AM' },
  ];

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={headerTitleContainerStyle}>
          <img src="/logo.svg" alt="University Logo" style={logoStyle} />
          <div>
            <h1 style={headerSubtitleStyle}>University of Southeastern Philippines</h1>
            <h2 style={headerTitleStyle}>Automatic Plate Number Recognition</h2>
          </div>
        </div>
        <button style={aboutButtonStyle} onClick={() => window.location.href = '/about'}>
          About
        </button>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        {/* Live Footage */}
        <div style={videoContainerStyle}>
          <video
            width="100%"
            height="100%"
            controls
            autoPlay
            loop
            style={{ objectFit: 'cover' }}
          >
            <source src="your-video-source-url.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* License Plate Capture */}
        <div style={licensePlateContainerStyle}>
          <h3>Captured License Plate</h3>
          <img
            src="your-license-plate-image-url.jpg"
            alt="Captured License Plate"
            style={{ maxWidth: '80%', marginBottom: '10px', borderRadius: '8px' }}
          />
          <p><strong>Plate Number:</strong> TIT 127</p>
          <p><strong>Date:</strong> 11/29/2024</p>
          <p><strong>Time:</strong> 7:49 PM</p>
        </div>
      </div>

      {/* History Section */}
      <div style={historySectionStyle}>
        <h3 style={historyTableTitleStyle}>License Plate History</h3>
        <table style={historyTableStyle}>
          <thead>
            <tr>
              <th style={historyTableHeaderStyle}>Date (mm/dd/yyyy)</th>
              <th style={historyTableHeaderStyle}>Time</th>
              <th style={historyTableHeaderStyle}>Plate Number</th>
            </tr>
          </thead>
          <tbody>
            {sampleHistory.map((entry, index) => (
              <tr key={index} style={historyTableRowStyle}>
                <td style={historyTableDataStyle}>{entry.date}</td>
                <td style={historyTableDataStyle}>{entry.time}</td>
                <td style={historyTableDataStyle}>{entry.plateNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
