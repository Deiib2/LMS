import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateItem from "./pages/CreateItem";

function App() {
  return (
    <>
      <BrowserRouter>
      <div className="container">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/createitem" element={<CreateItem />} />
        </Routes>
      </div>
      </BrowserRouter>
      </>
  );
}

export default App;
