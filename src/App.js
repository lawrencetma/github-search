import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { HomePage, SearchResultsPage, RepositoryDetailsPage } from './pages';
import { AppProvider } from './context/appContext';

function App() {

  
  return (
    <div className="App">
      <AppProvider>
        <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/searchresults" element={<SearchResultsPage />} />
              <Route path="/repositorydetails" element={<RepositoryDetailsPage />} />
            </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
