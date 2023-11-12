import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Account,
  Employee,
  EmployeeTraining,
  Login,
  NotFound,
  Training,
} from "src/Pages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/employee-training" element={<EmployeeTraining />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </Router>
  );
}

export default App;
