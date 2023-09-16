import { useState, useRef } from 'react';
import './home.styles.scss';

const HomeRoute = () => {
  const [video, setVideo] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // Possible values: 'upload', 'record'
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0] || e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideo(file);
    } else {
      alert('Please upload a valid video file');
      setVideo(null);
    }
  };

  const handleSubmit = async () => {
    if (!video) return;

    const formData = new FormData();
    formData.append('video', video);

    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Video uploaded successfully');
      } else {
        alert('Error uploading video');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const onDragLeave = () => {
    setHighlight(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleVideoChange(e);
    setHighlight(false);
  };

  const handleRecord = async () => {
    if (recording) {
      // Stop the recording
      mediaRecorderRef.current.stop();
    } else {
      // Start the live video stream and recording
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current = new MediaRecorder(stream);

      // Array to hold the recorded chunks
      const localChunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          localChunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // Convert the recorded chunks into a blob
        const blob = new Blob(localChunks, { type: 'video/webm' });

        // Stop the live stream from the camera
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());

        // Set the video source to the recorded video to allow playback
        videoRef.current.srcObject = null;
        videoRef.current.src = URL.createObjectURL(blob);
        videoRef.current.loop = true; // optional: if you want the video to loop

        setVideo(blob); // Save the recorded video blob
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  return (
    <div className='video-upload-container'>
      <div className='tab-bar'>
        <button
          onClick={() => setActiveTab('upload')}
          className={activeTab === 'upload' ? 'active' : ''}>
          Upload
        </button>
        <button
          onClick={() => setActiveTab('record')}
          className={activeTab === 'record' ? 'active' : ''}>
          Record
        </button>
      </div>

      {activeTab === 'upload' ? (
        <div className='upload-container'>
          <div
            className={`drop-zone ${highlight ? 'highlight' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}>
            Drag & Drop or Click to Upload
            <input
              type='file'
              accept='video/*'
              onChange={handleVideoChange}
              className='file-input'
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!video}>
            Upload
          </button>
        </div>
      ) : (
        <div className='record-container'>
          <video
            ref={videoRef}
            width='320'
            height='240'
            controls></video>
          <button onClick={handleRecord}>
            {recording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeRoute;
