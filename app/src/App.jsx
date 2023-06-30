import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Document from './Pages/Document';

export default function App() {

  return <Router>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/document/:id" element={<Document />} />

    </Routes>
  </Router>

}