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
      // Stopping the mediaRecorder
      mediaRecorderRef.current.stop();

      // Stopping each track in the stream
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;

      setRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      let chunks = []; // Array to store recorded video data

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // Convert recorded chunks to a single blob
        const blob = new Blob(chunks, { type: 'video/webm' });
        videoRef.current.src = URL.createObjectURL(blob);
        chunks = []; // Clear the chunks for next recording
      };

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error('Error acquiring media stream:', error);
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
