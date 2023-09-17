import { useState, useRef } from 'react';
import { toast } from 'react-toastify';

import ContainerForToast from '../../components/toast/toast.component';
import { TOAST_PROPS } from '../../components/toast/toast.settings';

import 'react-toastify/dist/ReactToastify.css';
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
    formData.append('file', video);

    try {
      const promiseToastForUpload = toast.loading(
        'Uploading video...',
        TOAST_PROPS
      );

      const uploadResponse = await fetch('http://127.0.0.1:8000/uploadfile/', {
        method: 'POST',
        body: formData,
      });
      console.log(uploadResponse);
      if (uploadResponse.ok) {
        toast.update(promiseToastForUpload, {
          ...TOAST_PROPS,
          render: 'Video uploaded successfully',
          type: 'success',
          isLoading: false,
        });

        const promiseToastForProcess = toast.loading(
          'Processing video...',
          TOAST_PROPS
        );

        const processResponse = await fetch(
          'http://127.0.0.1:8000/processfile/',
          {
            method: 'GET',
            body: uploadResponse.content.filename,
          }
        );

        if (processResponse.ok) {
          toast.update(promiseToastForProcess, {
            ...TOAST_PROPS,
            render: 'Video processed!',
            type: 'success',
            isLoading: false,
          });
          const transcribeFilesResponse = await fetch(
            'http://127.0.0.1:8000/transcribefiles/',
            {
              method: 'GET',
              body: processResponse.content.foldername,
            }
          );
        } else {
          toast.update(promiseToastForProcess, {
            ...TOAST_PROPS,
            render: 'Video could not be processed',
            type: 'error',
            isLoading: false,
          });
        }
      } else {
        toast.update(promiseToastForUpload, {
          ...TOAST_PROPS,
          render: 'Video could not be uploaded',
          type: 'error',
          isLoading: false,
        });
      }
    } catch (error) {
      toast.error('Error: ' + error, TOAST_PROPS);
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

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
    <>
      <div className='app-container'>
        <ContainerForToast />

        <h1 className='product-title'>ClipCut</h1>

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
                {video ? (
                  <>
                    {/* Displaying the video itself */}
                    <video
                      width='320'
                      height='240'
                      controls>
                      <source
                        src={URL.createObjectURL(video)}
                        type='video/mp4'
                      />
                      Your browser does not support the video tag.
                    </video>
                    {/* Displaying the video name if you'd prefer that */}
                    {/* <p>{video.name}</p> */}
                  </>
                ) : (
                  <>Drag & Drop or Click to Upload</>
                )}

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
      </div>
    </>
  );
};

export default HomeRoute;
