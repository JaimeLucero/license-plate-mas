import React from 'react';

const About: React.FC = () => {
  // Inline styles for About Page
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
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

  const logoStyle: React.CSSProperties = {
    width: '40px', // Smaller logo width
    height: '40px', // Smaller logo height
    marginRight: '10px',
    backgroundColor: 'transparent',
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

  const backButtonStyle: React.CSSProperties = {
    backgroundColor: '#f1c40f',
    color: '#800000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const contentStyle: React.CSSProperties = {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '24px',
    marginBottom: '10px',
  };

  const developerContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const developerCardStyle: React.CSSProperties = {
    textAlign: 'center',
    width: '150px',
  };

  const developerImageStyle: React.CSSProperties = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  };

  // Handler for the Back button (using window.location.href)
  const handleBack = () => {
    window.location.href = '/'; // Navigate back to the dashboard (home page)
  };

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
        <button style={backButtonStyle} onClick={handleBack}>
          Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        <h2 style={sectionTitleStyle}>About the Dashboard</h2>
        <p>
          This dashboard is designed to facilitate automatic recognition and tracking of vehicle license plates. 
          It features a live video feed, license plate capture, and a history log to ensure streamlined management 
          of vehicle entries and exits.
        </p>

        <h3 style={sectionTitleStyle}>Developers</h3>
        <div style={developerContainerStyle}>
          {[ 
            { name: 'John Doe', position: 'Lead Developer', school: 'USeP' },
            { name: 'Jane Smith', position: 'Frontend Developer', school: 'USeP' },
            { name: 'Alice Johnson', position: 'Backend Developer', school: 'USeP' },
            { name: 'Bob Brown', position: 'Database Specialist', school: 'USeP' },
            { name: 'Charlie White', position: 'UI/UX Designer', school: 'USeP' },
            { name: 'Dana Black', position: 'Tester', school: 'USeP' },
          ].map((developer, index) => (
            <div key={index} style={developerCardStyle}>
              <img
                src={`https://via.placeholder.com/100?text=${developer.name.split(' ')[0]}`}
                alt={developer.name}
                style={developerImageStyle}
              />
              <p><strong>{developer.name}</strong></p>
              <p>{developer.position}</p>
              <p><strong>{developer.school}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
