import './App.css';
import Header from './components/header/Header';
import Resume from './pages/resume/Resume';

// import Home from './pages/home/Home';

function App() {
  
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // on resize
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <div className="app">
      <Header />
      <Resume />
    </div>
  );
}

export default App;
