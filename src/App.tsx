
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Game from "./pages/Game";
import FilterPage from "./pages/FilterPage";

function App() {

  return (
      <div className="App">
          <header className="App-header">
              <Router>
                  <Routes>
                      <Route path={'/blockle'} element={<Game />} />
                      <Route path={'/blockle/filters'} element={<FilterPage />}/>
                  </Routes>
              </Router>
          </header>
      </div>
  );
}

export default App;
