import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import EmployeeAccount from "src/Dummy/EmployeeAccount";

// eslint-disable-next-line react/prop-types
const DeleteAccount = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const deleteData = () => {
    const indexAccount = EmployeeAccount.findIndex((e) => e.id === id);
    if (indexAccount > -1) {
      EmployeeAccount.splice(indexAccount, 1);
    }

    navigate("/account");

    Swal.fire({
      title: "Success",
      icon: "success",
      text: "Successfully delete Account",
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
    <Button variant="danger" onClick={() => alertDelete()}>
      <Trash3 />
    </Button>
  );
};

export default DeleteAccount;
