import "./App.css";
//components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Search from "./components/Search";
//
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='app w-[100vw] h-[100vh] overflow-x-hidden overflow-y-scroll'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
