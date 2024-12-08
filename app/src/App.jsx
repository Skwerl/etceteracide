import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Document from './Pages/Document';
import Editor from './Pages/Editor';
import Login from './Pages/Login';
import AQFile from './Pages/AQFile';

export default function App() {

  return <Router>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/document/:id" element={<Document />} />
      <Route path="/edit/:id?" element={<Editor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/aq/:id" element={<AQFile />} />

    </Routes>
  </Router>

}