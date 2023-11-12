import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import Training from "src/Dummy/Training";
import EmployeeTraining from "src/Dummy/EmployeeTraining";

// eslint-disable-next-line react/prop-types
const DeleteTraining = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const deleteData = () => {
    const indexTraining = Training.findIndex((e) => e.id === id);
    if (indexTraining > -1) {
      Training.splice(indexTraining, 1);
    }

    EmployeeTraining.filter((e) => e.employeeId !== id);

    navigate("/training");

    Swal.fire({
      title: "Success",
      icon: "success",
      text: "Successfully delete Training ",
      timer: 3000,
    });

    if (handleDelete) {
      handleDelete();
    }
  };

  const alertDelete = () => {
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
  };

  return (
    <>
      <Button variant="danger" onClick={() => alertDelete()}>
        <Trash3 />
      </Button>
    </>
  );
};

export default DeleteTraining;
