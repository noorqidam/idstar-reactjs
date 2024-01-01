import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Employee,
  EmployeeTraining,
  Login,
  NotFound,
  Training,
  Account,
} from "src/Pages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee-training" element={<EmployeeTraining />} />
        <Route path="/training" element={<Training />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
