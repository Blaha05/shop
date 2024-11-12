import Home from "./main/main";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginBox from "./auth/login";
import RegisterBox from "./auth/register"
import Product from "./product/product";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginBox />} />
        <Route path="/register" element={<RegisterBox />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </Router>
  )
}

export default App;
