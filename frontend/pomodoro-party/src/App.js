import logo from './logo.svg';
import './App.css';
import Timer from './Timer.jsx';

function App() {
  return (
    <div className="App">
 
    {/* remember to add font size */}
    <Timer minutes={5} width={"210px"} height={"209px"} left={"792px"} top={"165px"} background={"#00798C91"} />  
    <Timer minutes={25} width={"488.95px"} height={"473.22px"} left={"457px"} top={"379px"} background={"#FFBFBF"} /> 
    <Timer minutes={45} width={"347.98px"} height={"347.98px"} left={"1055px"} top={"200.02px"} background={"#C1DBB3"}/> 
    <Timer minutes={60} width={"259.84px"} height={"251.5px"} left={"981px"} top={"591px"} background={"#F2C078"}/> 
    

    </div>
  );
}

export default App;
