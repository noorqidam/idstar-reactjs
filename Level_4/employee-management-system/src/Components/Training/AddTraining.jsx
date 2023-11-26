import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import apiConfig from "src/Config/api-config";

// eslint-disable-next-line react/prop-types
const AddTraining = ({ onAddTraining }) => {
  const navigate = useNavigate();

  const [modalAdd, setModalAdd] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [theme, setTheme] = useState("");

  const handleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const submitAdd = async () => {
    if (validateData()) {
      try {
        const response = await apiConfig.post("/v1/training/save", {
          tema: theme,
          pengajar: teacher,
        });

        if (response.status === 200) {
          onAddTraining();
          setTeacher("");
          setTheme("");

          navigate("/training");

          setModalAdd(!modalAdd);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Success Add New Training ",
            timer: 3000,
          });
        } else {
          alertFailAdd("Failed to add training");
        }
      } catch (error) {
        console.error("Error adding training:", error);
        alertFailAdd("Error adding training");
      }
    }
  };

  const validateData = () => {
    if (!teacher.trim()) {
      alertFailAdd("Name cannot be empty");
      return false;
    }

    if (!theme.trim()) {
      alertFailAdd("Type cannot be empty");
      return false;
    }

    return true;
  };

  const alertFailAdd = (text) => {
    Swal.fire({
      title: "Failed",
      icon: "warning",
      text: text,
      timer: 3000,
    });
  };

  return (
    <>
      <Button className="button-add" onClick={handleModalAdd}>
        Add new Training
      </Button>

      <Modal isOpen={modalAdd} toggle={handleModalAdd}>
        <ModalHeader className="modal-header">Add New Account</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Teacher</Label>
              <Input
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                type="text"
                id="teacher"
                required
                placeholder="teacher"
              />
            </FormGroup>
            <FormGroup>
              <Label>Theme</Label>
              <Input
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                type="text"
                id="theme"
                required
                placeholder="theme"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="button-submit" onClick={submitAdd}>
            Submit
          </Button>
          <Button color="secondary" outline onClick={handleModalAdd}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AddTraining;
