import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { Trash3 } from "react-bootstrap-icons";
import EmployeeTraining from "src/Dummy/EmployeeTraining";

// eslint-disable-next-line react/prop-types
const DeleteEmployeeTraining = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const deleteData = () => {
    const indexAccount = EmployeeTraining.findIndex((e) => e.id === id);
    if (indexAccount > -1) {
      EmployeeTraining.splice(indexAccount, 1);
    }

    navigate("/employee-training");

    Swal.fire({
      title: "Success",
      icon: "success",
      text: "Successfully delete employee training ",
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
      <Button color="danger" onClick={() => alertDelete()}>
        <Trash3 />
      </Button>
    </>
  );
};

export default DeleteEmployeeTraining;
