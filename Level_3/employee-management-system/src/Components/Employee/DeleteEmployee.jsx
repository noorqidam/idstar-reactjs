import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import Employees from "src/Dummy/Employees";
import EmployeesDetail from "src/Dummy/EmployeeDetail";
import EmployeesAccount from "src/Dummy/EmployeeAccount";
import EmployeeTraining from "src/Dummy/EmployeeTraining";

// eslint-disable-next-line react/prop-types
const DeleteEmployee = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const deleteData = () => {
    const indexEmp = Employees.findIndex((e) => e.id === id);
    const indexEmpDetail = EmployeesDetail.findIndex((e) => e.id === id);

    if (indexEmp > -1) {
      Employees.splice(indexEmp, 1);
    }
    if (indexEmpDetail > -1) {
      EmployeesDetail.splice(indexEmpDetail, 1);
    }

    EmployeesAccount.filter((e) => e.employeeId !== id);
    EmployeeTraining.filter((e) => e.employeeId !== id);

    navigate("/employee");

    Swal.fire({
      title: "Success",
      icon: "success",
      text: "Successfully delete Employee ",
      timer: 3000,
    });

    if (handleDelete) {
      handleDelete();
    }
  };

  function alertDelete() {
    Swal.fire({
      title: "Are you sure to delete it?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData();
      }
    });
  }

  return (
    <>
      <Button variant="danger" onClick={() => alertDelete()}>
        <Trash3 />
      </Button>
    </>
  );
};

export default DeleteEmployee;
