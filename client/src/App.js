import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Home from './views/home/Home';
import Form from './views/form/Form';
import Detail from './views/detail/Detail';
import LandingPage from './views/landingPage/LandingPage.jsx';
import NavBar from './components/navBar/NavBar.jsx';
import Update from './components/update/Update.jsx'

function App() {
  return (
    <div className="App">
       
      {!((useLocation()).pathname === "/") && <NavBar path="/:"/>}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<Form/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;
