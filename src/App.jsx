import { useState, useEffect } from 'react';
import nyom from './assets/nyom.png'; 
import './App.css';

function PageViewCounter() {
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const count = Number(localStorage.getItem("activeUsers")) || 0;
      localStorage.setItem("activeUsers", count + 1);
      setViewerCount(count + 1);
    };

    updateCount();

    const handleUnload = () => {
      const count = Number(localStorage.getItem("activeUsers")) || 1;
      localStorage.setItem("activeUsers", Math.max(0, count - 1));
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <div className="title_text">
      <p>Viewers Online: {viewerCount}</p>
    </div>
  );
}


function Header({ setPage }) {
  return (
    <div className="title_bar">
      <h1 className="title">WEBCHAT</h1>
      <nav>
        <button className="title_text" onClick={() => setPage('chat')}>CHAT</button>
        <button className="title_text" onClick={() => setPage('about')}>ABOUT</button>
        <PageViewCounter />
      </nav>
    </div>
  );
}

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="center">
      <div className="contents">
        <div id="input">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type a message..." 
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index} className="message">{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="center">
      <div className="contents" id="about">
        <div>
          <img src={ nyom } alt="Photo" />
          <p className="about_text">NTU CSIE 林靖昀</p>
        </div>
        <div>
          <h2 className="about_text">Hi!</h2>
          <p className="about_text">I am a sophomore student from NTU CSIE.</p>
          <p className="about_text">This is my LAB4 website!</p>
          <p className="about_text">:3 is my icon, :3</p>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [page, setPage] = useState('chat');

  return (
    <>
      <Header setPage={setPage} />
      {page === 'chat' ? <Chat /> : <About />}
    </>
  );
}

export default App;
