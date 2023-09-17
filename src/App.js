import { useState } from 'react';

import HomeRoute from './routes/home/home.route';

import DownloadModal from './components/download-modal/download-modal.component';

import './App.css';

function App() {
  const [showDownloadModal, setShowDownloadModal] = useState(true);

  return (
    <div className='App'>
      <header className='App-header'>
        <DownloadModal
          showModal={showDownloadModal}
          setShowModal={setShowDownloadModal}
        />
        <HomeRoute
          showModal={showDownloadModal}
          setShowModal={setShowDownloadModal}
        />
      </header>
    </div>
  );
}

export default App;
