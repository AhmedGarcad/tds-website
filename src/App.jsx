import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./App.css"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Documents from "./pages/Documents"
import Home from "./pages/Home"
import Policies from "./pages/Policies"
import Projects from "./pages/Projects"
import Services from "./pages/Services"

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <div className="site-footer">
          <Footer />
          <p>Delivering Results, Exceeding Expectations</p>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
