import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import apiConfig from "src/Config/api-config";

// eslint-disable-next-line react/prop-types
const DeleteTraining = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const deleteData = async () => {
    try {
      const response = await apiConfig.delete(`/v1/training/delete/${id}`);

      if (response.status === 200) {
        navigate("/training");

        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Successfully delete Training",
          timer: 3000,
        });

        if (handleDelete) {
          handleDelete();
        }
      } else {
        alertFailDelete("Failed to delete training");
      }
    } catch (error) {
      console.error("Error deleting training:", error);
      alertFailDelete("Error deleting training");
    }
  };

  const alertFailDelete = (text) => {
    Swal.fire({
      title: "Failed",
      icon: "warning",
      text: text,
      timer: 3000,
    });
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
