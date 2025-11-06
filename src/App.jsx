import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Live from './Pages/Live/Live';
import Programs from './Pages/Programs/Programs';
import Sports from './Pages/Sports/Sports';
import News from './Pages/News/News';
import Schedule from './Pages/Schedule/Schedule';
import Player from './components/Player/Player';
import { AudioProvider } from './context/audioContext'; // 👈 importa tu provider
import './App.css';

export default function App() {
  return (
    <div className="appContainer">
      <Router>
        <AudioProvider> {/* ✅ Envolver todo dentro del contexto */}
          <Header />
          <main className='MainContainer'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/live' element={<Live />} />
              <Route path='/programs' element={<Programs />} />
              <Route path='/sports' element={<Sports />} />
              <Route path='/news' element={<News />} />
              <Route path='/schedule' element={<Schedule />} />
            </Routes>
          </main>
          <Player />
        </AudioProvider>
      </Router>
    </div>
  );
}
