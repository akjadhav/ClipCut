import { useState } from 'react';
import './home.styles.scss';

const HomeRoute = () => {
  const [video, setVideo] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
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

  return (
    <div className='video-upload-container'>
      <input
        type='file'
        accept='video/*'
        onChange={handleVideoChange}
      />
      <button
        onClick={handleSubmit}
        disabled={!video}>
        Upload
      </button>
    </div>
  );
};

export default HomeRoute;
