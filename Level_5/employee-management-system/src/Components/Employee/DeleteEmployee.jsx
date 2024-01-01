import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import apiConfig from "src/Config/api-config";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const DeleteEmployee = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const deleteData = async () => {
    try {
      await apiConfig.delete(`/v1/karyawan/delete/${id}`);

      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Successfully delete Employee",
        timer: 3000,
      });

      if (handleDelete) {
        handleDelete();
      }
      navigate("/employee");
    } catch (error) {
      console.error("Error deleting employee:", error);
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: "Failed to delete Employee",
        timer: 3000,
      });
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

export default DeleteEmployee;
