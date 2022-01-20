import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BudgetMain from "./BudgetMain";
import LandingPage from "./LandingPage";

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/budget" element={<BudgetMain/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
