import './App.css';
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Contacts from "./containers/Contacts/Contacts";
import Add from "./containers/Add/Add";
import About from "./containers/About/About";

const App = () => (
  <div className="app">
    <Header />

    <main className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/add" element={<Add />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  </div>
);

export default App;