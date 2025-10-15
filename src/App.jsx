import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";

// --- Mock Data for Games ---
const games = [
  { id: 1, name: "Wordle", image: "https://tse2.mm.bing.net/th/id/OIP.tl30bG2F-Q2yNo-lITHJEAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3", link: "wordle.html" },
  { id: 2, name: "WAM", imawge: "https://tse2.mm.bing.net/th/id/OIP.xYufzTNhbdMIGNnirsb7RgAAAA?cb=12&w=256&h=256&rs=1&pid=ImgDetMain&o=7&rm=3", link: "wam.html" },
  { id: 3, name: "Pong", image: "https://logodix.com/logo/1021657.png", link: "pong.html" },
  { id: 4, name: "Geometric Dash", image: "https://th.bing.com/th/id/R.2a527448abbb085f6c89793cfb5f65f5?rik=A7ss82CSOJPrkg&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fgeometry-dash%2fimages%2f9%2f90%2fGeometryDash.png%2frevision%2flatest%3fcb%3d20160224042843&ehk=Hvk2rFdCmF08iQinZYieMsLbvo4NDNdKYic8xB6GqZE%3d&risl=&pid=ImgRaw&r=0", link: "Geometricdash.html" },
  { id: 5, name: "Cards", image: "https://plays.org/wp-content/uploads/kids-memory-match.png", link: "Cards.html" },
];

// --- Reusable Components ---
const HeaderLogo = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 animate-pulse">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "var(--neon-green)", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "var(--neon-blue)", stopOpacity: 1 }} />
      </linearGradient>
      <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g style={{ filter: "url(#logoGlow)" }}>
      <path d="M6 12H18M12 6V18M9.5 9.5H14.5V14.5H9.5V9.5Z" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="url(#logoGradient)" strokeWidth="1.5" />
    </g>
  </svg>
);

const CircularGallery = ({ items }) => {
  const [rotation, setRotation] = useState(0);
  const autoRotateRef = useRef(null);
  const itemAngle = 360 / items.length;
  const radius = 255;

  useEffect(() => {
    autoRotateRef.current = setInterval(() => setRotation((prev) => prev + 0.2), 50);
    return () => clearInterval(autoRotateRef.current);
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-carousel" style={{ transform: `rotateY(${rotation}deg)` }}>
        {items.map((item, index) => (
          <div key={item.id} className="gallery-item" style={{ transform: `rotateY(${itemAngle * index}deg) translateZ(${radius}px)` }}>
            <Link to={item.link || "/"}>
              <img src={item.image} alt={item.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Generic Game Page Component ---
const GamePage = ({ title, src }) => (
  <div className="text-center p-5">
    <h2 className="text-neon-gradient mb-3">{title}</h2>
    <iframe
      src={src}
      title={title}
      style={{
        width: "90%",
        height: "700px",
        border: "2px solid var(--neon-blue)",
        borderRadius: "10px",
        boxShadow: "0 0 20px var(--neon-blue)",
      }}
    ></iframe>
    <div className="mt-4">
      <Link to="/" className="btn btn-outline-light">
        ⬅ Back to Game Hub
      </Link>
    </div>
  </div>
);

// --- Homepage Component ---
const HomePage = () => {
  const [memes, setMemes] = useState([]);
  const [loadingMemes, setLoadingMemes] = useState(true);

  useEffect(() => {
    fetch("https://meme-api.com/gimme/gamingmemes/12")
      .then((res) => res.json())
      .then((data) => { if (data.memes) setMemes(data.memes); setLoadingMemes(false); })
      .catch(() => setLoadingMemes(false));
  }, []);

  return (
    <div className="container text-center py-4">
      <header className="py-5">
        <HeaderLogo />
        <h1 className="display-3 fw-bold text-neon-gradient text-neon-glow">GAME HUB</h1>
        <p className="mt-3 fs-5 text-light">INSERT COIN TO PLAY</p>
      </header>

      <section className="my-5 py-5">
        <h2 className="display-5 text-neon-gradient mb-3" style={{ textShadow: "0 0 10px var(--neon-green)" }}>
          FEATURED GAMES
        </h2>
        <CircularGallery items={games} />
      </section>

      <section className="my-5 py-5">
        <h2 className="display-5 text-neon-gradient mb-5" style={{ textShadow: "0 0 10px var(--neon-pink)" }}>
          CHOOSE YOUR ADVENTURE
        </h2>
        <div className="row g-4">
          {games.map((game) => (
            <div className="col-6 col-md-4 col-lg-3" key={game.id}>
              <Link to={game.link || "/"} className="text-decoration-none">
                <div className="bg-black bg-opacity-40 p-3 rounded-3 card-neon-border d-flex flex-column">
                  <img src={game.image} alt={game.name} className="w-100 object-cover rounded mb-3 border border-secondary" />
                  <h3 className="fs-6 mt-auto text-white">{game.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="my-5 py-5">
        <h2 className="display-5 text-neon-gradient mb-5" style={{ textShadow: "0 0 10px var(--neon-blue)" }}>
          MEME ZONE
        </h2>
        {loadingMemes ? <p className="fs-4 text-light">LOADING MEMES...</p> :
          <div className="row g-4">
            {memes.map((meme, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="meme-card d-flex flex-column">
                  <h4 className="fs-6 text-neon-gradient mb-3">{meme.title}</h4>
                  <img src={meme.url} alt={meme.title} className="img-fluid mt-auto" />
                </div>
              </div>
            ))}
          </div>
        }
      </section>

      <footer className="py-5 mt-5 border-top border-2 border-primary"
        style={{ "--bs-border-color": "var(--neon-blue)", boxShadow: "0 -5px 15px -5px var(--neon-blue)" }}>
        <p>&copy; {new Date().getFullYear()} GAME HUB. ALL RIGHTS RESERVED.</p>
        <p className="mt-2 small text-secondary">READY PLAYER ONE</p>
      </footer>
    </div>
  );
};

// --- App Component with Router ---
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wordle" element={<GamePage title="Wordle Game" src="/wordle.html" />} />
      <Route path="/wam" element={<GamePage title="WAM Game" src="/wam.html" />} />
      <Route path="/pong" element={<GamePage title="Pong Game" src="/pong.html" />} />
      <Route path="/geometricdash" element={<GamePage title="Geometric Dash" src="/Geometricdash.html" />} />
      <Route path="/cards" element={<GamePage title="Cards Game" src="/Cards.html" />} />
    </Routes>
  );
}

export default App;
