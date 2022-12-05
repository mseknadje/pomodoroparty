import logo from './logo.svg';
import './App.css';
import Timer from './Timer.jsx';
import './Navbar.css';
import Navbar from './Navbar';
import { Party } from './Pages/Party';
import { Profile } from './Pages/Profile';
import Todo from './Todo';
// import { Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
    <Navbar/>
    <div className="container">
      {/* <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/party" element={<Party />} />
      </Routes> */}
      </div>
    <Todo/>
    <div className="App">
    
    <Timer minutes={5} width={"210px"} height={"209px"} left={"792px"} top={"165px"} background={"#00798C91"} />  
    <Timer minutes={25} width={"488.95px"} height={"473.22px"} left={"457px"} top={"379px"} background={"#FFBFBF"} /> 
    <Timer minutes={45} width={"347.98px"} height={"347.98px"} left={"1055px"} top={"200.02px"} background={"#C1DBB3"}/> 
    <Timer minutes={60} width={"259.84px"} height={"251.5px"} left={"981px"} top={"591px"} background={"#F2C078"}/> 
    </div>
    </>
  );
}

export default App;
