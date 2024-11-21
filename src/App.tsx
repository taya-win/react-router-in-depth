import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";

export default function App() {
    return <BrowserRouter>
        <header>
            <nav>
                <h1>Jobarouter</h1>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>

        </header>
        <Routes>
            <Route index element={<Home />} />
            <Route path='/about' element={<About />} />
        </Routes>
    </BrowserRouter>
}