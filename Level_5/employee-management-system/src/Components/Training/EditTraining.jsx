/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { Pencil } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import apiConfig from "src/Config/api-config";

const EditTraining = ({ data, onUpdateTraining }) => {
  const { item } = data;
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(item.pengajar);
  const [theme, setTheme] = useState(item.tema);
  const [modalEdit, setModalEdit] = useState(false);

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const submitEdit = async () => {
    if (validateData()) {
      try {
        const response = await apiConfig.put("/v1/training/update", {
          id: item.id,
          tema: theme,
          pengajar: teacher,
        });

        if (response.status === 200) {
          onUpdateTraining();
          navigate("/training");

          setModalEdit(!modalEdit);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Success Edit",
            timer: 3000,
          });
        } else {
          alertFailEdit("Failed to edit training");
        }
      } catch (error) {
        console.error("Error editing training:", error);
        alertFailEdit("Error editing training");
      }
    }
  };

  const validateData = () => {
    if (!teacher.trim()) {
      alertFailEdit("Account Name cannot be empty");
      return false;
    }

    if (!theme.trim()) {
      alertFailEdit("Type cannot be empty");
      return false;
    }

    return true;
  };

  const alertFailEdit = (text) => {
    Swal.fire({
      title: "Failed",
      icon: "warning",
      text: text,
      timer: 3000,
    });
  };

  return (
    <>
      <Button
        color="secondary"
        outline
        onClick={handleModalEdit}
        className="mr-3"
      >
        <Pencil />
      </Button>
      <Modal isOpen={modalEdit} toggle={handleModalEdit}>
        <ModalHeader className="modal-header">Edit Training</ModalHeader>
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
                placeholder={teacher}
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
                placeholder={theme}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="button-submit" onClick={submitEdit}>
            Submit
          </Button>

          <Button color="secondary" outline onClick={handleModalEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditTraining;
