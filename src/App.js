import "./App.css";
import ShowsList from "./components/ShowList";
import ShowSummary from "./components/ShowSummary";
import Book from "./components/Book";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ShowsList />} />
          <Route path="/summary/:id" element={<ShowSummary />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
