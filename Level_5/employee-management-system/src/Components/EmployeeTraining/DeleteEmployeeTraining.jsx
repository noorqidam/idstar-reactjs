import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import { Trash3 } from "react-bootstrap-icons";
import apiConfig from "src/Config/api-config";

// eslint-disable-next-line react/prop-types
const DeleteEmployeeTraining = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const deleteData = async () => {
    try {
      const response = await apiConfig.delete(
        `/v1/karyawan-training/delete/${id}`
      );

      if (response.status === 200) {
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
      } else {
        alertDelete("Failed to delete employee training");
      }
    } catch (error) {
      console.error("Error deleting employee training:", error);
      alertDelete("Error deleting employee training");
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
