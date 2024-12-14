import React, {useRef, useEffect, useState} from 'react';
import axios from "axios";

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
  
  const timeOverlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'monospace',
  };

  const licensePlateContainerStyle: React.CSSProperties = {
    width: '50%',
    height: '400px',
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [streamingError, setStreamingError] = useState<string | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [detectedPlate, setDetectedPlate] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [plateImageBlob, setPlateImageBlob] = useState<string | null>(null);
  const [licenseNumber, setLicenseNumber] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState([]);  // State to store the license plate history
  const [error, setError] = useState(null);  // State to handle errors
  const [loading, setLoading] = useState(true);  // State to manage loading state

  const apiURL = "https://detect.roboflow.com/philippine-license-plates-mefb8/1";
  const apiKey = "Hk4nrwWS4QjxSqdjeIzy";

  // Initialize the live video stream
  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 800, height: 500 },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
        setStreamingError("Unable to access camera. Please check permissions.");
      }
    };

    startVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Update the current date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}`
      );
    };

    const timer = setInterval(updateDateTime, 500);

    return () => clearInterval(timer);
  }, []);

  const captureFrameAndDetect = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      if (context) {
        // Update canvas size to match video size
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
  
        // Clear previous canvas drawing (optional)
        context.clearRect(0, 0, canvas.width, canvas.height);
  
        // Draw the current video frame onto the canvas
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
        // Convert the canvas content to a blob
        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const base64Image = await convertBlobToBase64(blob);
  
              // Send the base64 image to the Roboflow API
              const response = await axios.post(apiURL, base64Image, {
                params: { api_key: apiKey },
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
              });
  
              // Handle the API response
              const predictions = response.data?.predictions || [];
              console.log("Predictions:", predictions); // Debugging prediction data
              console.log(predictions.length)
              const canvasWidth = 800; // Canvas width in pixels
              const canvasHeight = 500; // Canvas height in pixels


              if (predictions.length > 0) {
                predictions.forEach((prediction) => {
                  console.log("Prediction:", prediction); // Debugging the entire prediction object
              
                  // Ensure prediction attributes exist
                  if (prediction.x !== undefined && prediction.y !== undefined && prediction.width !== undefined && prediction.height !== undefined) {
                    const { x, y, width, height, confidence } = prediction; // Destructure directly
                    // Debugging original values
                    console.log(`Original Bounding Box - x: ${x}, y: ${y}, width: ${width}, height: ${height}`);


                    // Scale bounding box coordinates to canvas size
                    let scaledX = x - 160;
                    let scaledY = y - 60;
                    let scaledWidth = width;
                    let scaledHeight = height;
                  
                    // Check and adjust the width if it exceeds canvas bounds
                    if (scaledX + scaledWidth > canvasWidth) {
                      console.log(`Width exceeds canvas, adjusting from ${scaledWidth} to ${canvasWidth - scaledX}`);
                      scaledWidth = canvasWidth - scaledX + 10; // Limit width to fit canvas
                    }

                    // Check and adjust the height if it exceeds canvas bounds
                    if (scaledY + scaledHeight > canvasHeight) {
                      console.log(`Height exceeds canvas, adjusting from ${scaledHeight} to ${canvasHeight - scaledY}`);
                      scaledHeight = canvasHeight - scaledY + 10; // Limit height to fit canvas
                    }

                    // Check and adjust the x-coordinate if it's out of bounds
                    if (scaledX < 0) {
                      console.log(`X exceeds canvas bounds, adjusting from ${scaledX} to 0`);
                      scaledX = 0; // Set X to 0 if it's negative
                    }

                    // Check and adjust the y-coordinate if it's out of bounds
                    if (scaledY < 0) {
                      console.log(`Y exceeds canvas bounds, adjusting from ${scaledY} to 0`);
                      scaledY = 0; // Set Y to 0 if it's negative
                    }



                    // Debugging scaled bounding box values
                    console.log(`Scaled Bounding Box - x: ${scaledX}, y: ${scaledY}, width: ${scaledWidth}, height: ${scaledHeight}`);

                    // Check if scaled values are within canvas bounds
                    if (
                      scaledX >= 0 &&
                      scaledY >= 0 &&
                      scaledX + scaledWidth <= canvas.width &&
                      scaledY + scaledHeight <= canvas.height
                    ) {
                      // Draw bounding box and label
                      drawBoundingBox(
                        context,
                        scaledX,
                        scaledY,
                        scaledWidth,
                        scaledHeight,
                        "License Plate", // Use a default label for now
                        (confidence * 100).toFixed(2) // Confidence as percentage
                      );

                      // Extract the detected license plate image from the canvas
                      const plateImage = extractPlateImage(context, scaledX, scaledY, scaledWidth, scaledHeight);
                      if (plateImage) {
                        setPlateImageBlob(plateImage);
                        convertImageToText(plateImage);
                        updateDateTime();
                        console.log("Extracted License Plate Image:", plateImage); // Base64 image of the license plate

                        // Here you can send the extracted plate image to another API or save it
                      }
                    } else {
                      console.log("Bounding box is out of canvas bounds, skipping:", {
                        scaledX,
                        scaledY,
                        scaledWidth,
                        scaledHeight,
                      });
                    }
                  }
                });
              } else {
                console.log("No predictions found.");
              }              
            } catch (error) {
              console.error("Error during API request:", error);
            }
          }
        }, "image/jpeg");
      }
    }
  };

  const updateDateTime = () => {
    const currentDate = new Date();
  
    // Get current date in YYYY-MM-DD format
    const formattedDate = currentDate.toLocaleDateString();
  
    // Get current time in HH:mm:ss format
    const formattedTime = currentDate.toLocaleTimeString();
  
    // Set the date and time in state
    setDate(formattedDate);
    setTime(formattedTime);
  };
  

  const convertImageToText = async (base64Image) => {
    const apiKey = 'IaCGQMurc/37b/e6T98ZtA==5xJXXsZvXus2Nkwf'; // Replace with your actual API key
    console.log('Received Base64 Image:', base64Image ? 'Valid Base64' : 'Invalid Base64');
    
    // Convert Base64 to Blob
    const base64ToBlob = (base64) => {
      const byteCharacters = atob(base64.split(',')[1]); // Decode the base64 string (splitting to remove the header part)
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset++) {
        byteArrays.push(byteCharacters.charCodeAt(offset));
      }
      
      const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpeg' }); // Specify image type (JPEG in this case)
      return blob;
    };
  
    try {
      // Convert the base64 string to a Blob
      const imageBlob = base64ToBlob(base64Image);
  
      // Create a FormData object to send the image as file
      const formData = new FormData();
      formData.append('image', imageBlob, 'image.jpg'); // Add the image Blob to FormData
      
      // Send POST request to the image-to-text API with the image file
      const response = await axios.post(
        'https://api.api-ninjas.com/v1/imagetotext', 
        formData,  // Send FormData containing the Blob
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'multipart/form-data', // This tells the server to expect form data
          },
        }
      );
      
      console.log('Text Extracted:', response.data);
      processExtractedText(response.data);
      return response.data; // Returns the extracted text
  
    } catch (error) {
      console.error('Error while extracting text from image:', error);
      return null;
    }
  };


  const processExtractedText = (extractedText) => {
    // Assuming extractedText is the array like the one you posted
    const licenseText = extractedText
      .map(item => item.text)  // Extract text from each item
      .join(' ');  // Combine them into a single string
  
    // Now set the license number in the state
    if (licenseText && licenseText.trim() !== "") {
      setLicenseNumber(licenseText);
    } 
  };
  
  
  // Draw bounding box on canvas
  const drawBoundingBox = (
    context,
    x,
    y,
    width,
    height,
    label,
    confidence
  ) => {
    // Log the bounding box details for debugging
    console.log("Drawing bounding box:", {
      label,
      confidence,
      x,
      y,
      width,
      height,
    });
  
    context.beginPath();
    context.rect(x, y, width, height);
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.stroke();
  
    // Log the bounding box drawing action
    console.log(`Bounding box drawn at (${x}, ${y}) with width ${width} and height ${height}`);
  
    // Draw label with confidence above the box
    context.font = "16px Arial";
    context.fillStyle = "red";
    context.fillText(`${label} (${confidence}%)`, x, y - 10);
  
    // Log label and confidence drawing
    console.log(`Label: ${label} (${confidence}%) drawn at (${x}, ${y - 10})`);
  };
  
  

  // Helper function to extract and save license plate image
  const extractPlateImage = (context, x, y, width, height) => {
    const plateCanvas = document.createElement("canvas");
    const plateContext = plateCanvas.getContext("2d");

    if (plateContext) {
      plateCanvas.width = width;
      plateCanvas.height = height;
      plateContext.drawImage(
        context.canvas,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height
      );

      return plateCanvas.toDataURL("image/jpeg"); // Return base64 image
    }
    return null;
  };

  // Helper function to convert blob to base64
  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const interval = setInterval(captureFrameAndDetect, 3000); // Capture frame every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const saveLicensePlate = async (licenseNumber, date, time, plateImage) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/license-plates', {
        license_number: licenseNumber,
        date: date,
        time: time,
        image: plateImage
      });
      console.log('License Plate Saved:', response.data);
      setSaveMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // Handle 400 Bad Request error
        if (error.response.status === 400) {
          console.error('Bad Request - Invalid Data:', error.response.data);
          setSaveMessage('Bad Request: Invalid data. Please check your input.');
        } if (error.response.status === 409) {
          console.error('Bad Request - Data exists:', error.response.data);
          setSaveMessage('Bad Request: Data already exists.');
        } else {
          // Handle other errors (e.g., 500 Server error, etc.)
          console.error('Error:', error.response.data);
          setSaveMessage('An error occurred while saving the license plate.');
        }
      } else if (error.request) {
        // Handle no response from the server
        console.error('No response received:', error.request);
        setSaveMessage('No response from the server. Please try again later.');
      } else {
        // Handle errors in setting up the request
        console.error('Error in setting up request:', error.message);
        setSaveMessage('An error occurred while setting up the request.');
      }
    }
  };

  const handleSave = async () => {
    // Logic to save the license plate information (e.g., sending to an API, saving to local storage)
    console.log('License Number:', licenseNumber);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Image', plateImageBlob)
    await saveLicensePlate(licenseNumber, date, time, plateImageBlob);
    fetchHistory();  // Re-fetch the history after saving new data
  };

  const handleReset = () => {
    setLicenseNumber('');
    setDate('');
    setTime('');
    setPlateImageBlob('');
    setSaveMessage('');
  };

  // Fetch license plate history from API
  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/license-plates');
      setHistoryData(response.data);  // Set the fetched data to state
      setLoading(false);  // Set loading to false after data is fetched
    } catch (err) {
      setError('Failed to fetch license plate history');  // Set error message
      setLoading(false);  // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchHistory();  // Call the fetch function on component mount
  }, []);  // Empty dependency array ensures this runs once after the component mounts


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
        <div style={{ position: "relative", width: "100%", height: "auto" }}>
          {streamingError && <p style={{ color: "red" }}>{streamingError}</p>}

          {/* Video element */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "800px",
              height: "500px", // Adjust video height to a manageable size
              border: "1px solid black",
              display: "block",
            }}
          />

          {/* Canvas for drawing bounding boxes */}
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute", // Position it on top of the video
              top: 0,
              left: 0,
              width: "800px", // Canvas width matches video
              height: "500px", // Maintain aspect ratio of the canvas
              pointerEvents: "none", // Ensure the canvas doesn’t interfere with video interactions
              zIndex: 1, // Ensure canvas appears above the video
            }}
          />

          <p>Current Time: {currentDateTime}</p>

          {detectedPlate && (
            <p>
              Detected Plate: <strong>{detectedPlate}</strong> (Accuracy: {accuracy?.toFixed(2)}%)
            </p>
          )}
        </div>

        {/* License Plate Capture */}
        <div style={licensePlateContainerStyle}>
          <h3>Captured License Plate</h3>
          {plateImageBlob && (
          <div>
            <img src={plateImageBlob} alt="Detected License Plate" />
          </div>
        )}
          <label htmlFor="licenseNumber">
            <strong>Plate Number:</strong>
          </label>
          <input
            type="text"
            value={licenseNumber || ""}  // Default to empty string if licenseNumber is null
            onChange={(e) => setLicenseNumber(e.target.value)} // Update state on change
            placeholder="Enter License Number"
          />
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>

          <button onClick={() => handleSave()}>
            Save
          </button>
          <button 
          style={{
            marginTop: '10px'
          }}
          onClick={() => handleReset()}>
            Reset
          </button>
          <p><strong></strong> {saveMessage}</p>

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
          {
            loading ? (
              <tbody>
                <tr>
                  <td colSpan={3} style={historyTableDataStyle}>Loading...</td> {/* Show Loading... when loading is true */}
                </tr>
              </tbody>
            ) : error ? (
              <tbody>
                <tr>
                  <td colSpan={3} style={historyTableDataStyle}>Error: {error}</td> {/* Show error if there's one */}
                </tr>
              </tbody>
            ) : (
              <tbody>
                {historyData.map((entry, index) => (
                  <tr key={index} style={historyTableRowStyle}>
                    <td style={historyTableDataStyle}>{entry.date}</td>
                    <td style={historyTableDataStyle}>{entry.time}</td>
                    <td style={historyTableDataStyle}>{entry.license_number}</td> {/* Assuming 'license_number' field from the response */}
                  </tr>
                ))}
              </tbody>
            )
          }
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
