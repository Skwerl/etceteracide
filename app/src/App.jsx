import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Document from './Pages/Document';
import Editor from './Pages/Editor';
import Login from './Pages/Login';

export default function App() {

  return <Router>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/document/:id" element={<Document />} />
      <Route path="/edit/:id?" element={<Editor />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  </Router>

}