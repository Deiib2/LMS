import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateItem from "./pages/Librarian/CreateItem";
import RegisterUser from "./pages/Librarian/RegisterUser";
import MyItems from "./pages/Reader/MyItems";
import Lend from "./pages/Librarian/Lend";
import ExtensionRequests from "./pages/Librarian/ExtensionRequests";

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
          <Route path="/registeruser" element={<RegisterUser />} />
          <Route path="/myitems" element={<MyItems />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/extensionrequests" element={<ExtensionRequests />} />
        </Routes>
      </div>
      </BrowserRouter>
      </>
  );
}

export default App;
