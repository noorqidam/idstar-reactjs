/* eslint-disable react/prop-types */
import { useState } from "react";
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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Pencil } from "react-bootstrap-icons";
import { format, isValid, parseISO } from "date-fns";
import apiConfig from "src/Config/api-config";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const EditEmployeeTraining = ({ employee, onUpdateEmployee }) => {
  console.log(employee);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return isValid(parseISO(dateString))
      ? format(parseISO(dateString), "dd-MM-yyyy")
      : "Invalid Date";
  };

  const formattedTrainingDate = formatDate(employee?.training_date);

  const [trainingDate, setTrainingDate] = useState(formattedTrainingDate);

  const [modalEdit, setModalEdit] = useState(false);

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const onChangeTrainingDate = (e) => {
    setTrainingDate(e._d);
  };

  const submitEdit = async () => {
    if (validateData()) {
      try {
        await apiConfig.put("/v1/karyawan-training/update", {
          id: employee.id,
          karyawan: {
            id: employee.karyawan.id,
          },
          training: {
            id: employee.training.id,
          },
        });
        await onUpdateEmployee();
        navigate("/employee-training");
        setModalEdit(!modalEdit);
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Success Edit ",
          timer: 3000,
        });
      } catch (error) {
        alertFailEdit(`Failed to edit employee ${error}`);
      }
    }
  };

  const validateData = () => {
    if (!trainingDate) {
      alertFailEdit("Training Date cannot be empty");
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
        <ModalHeader className="modal-header">
          Edit Employee Training
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Employee</Label>
              <Input
                value={`${employee?.karyawan.name} - ${employee.karyawan.karyawanDetail.nik}`}
                disabled
                type="text"
                id="employeeId"
              />
            </FormGroup>
            <FormGroup>
              <Label>Training</Label>
              <Input
                value={`${employee.training.pengajar} - ${employee.training.tema}`}
                disabled
                type="text"
                id="trainId"
              />
            </FormGroup>
            <FormGroup>
              <Label>Training Date</Label>
              <Datetime
                locale="en"
                timeFormat={false}
                dateFormat="DD-MM-YYYY"
                initialValue={format(new Date(), "dd-MM-yyyy")}
                value={trainingDate}
                onChange={(e) => {
                  onChangeTrainingDate(e);
                }}
                inputProps={{ placeholder: "Training Date", readOnly: true }}
                className="w-100 me-1"
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

export default EditEmployeeTraining;
