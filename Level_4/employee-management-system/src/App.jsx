import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Employee, Login, NotFound, Training } from "src/Pages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </Router>
  );
}

export default App;
