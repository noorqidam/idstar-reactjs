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
import EmployeeTraining from "src/Dummy/EmployeeTraining";
import { format, isValid, parseISO } from "date-fns";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const EditEmployeeTraining = ({ employee, onUpdate }) => {
  const { item, emp, empDetail, train } = employee;
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return isValid(parseISO(dateString))
      ? format(parseISO(dateString), "dd-MM-yyyy")
      : "Invalid Date";
  };

  const formattedTrainingDate = formatDate(item?.trainingDate);

  const [trainingDate, setTrainingDate] = useState(formattedTrainingDate);

  const [modalEdit, setModalEdit] = useState(false);

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const onChangeTrainingDate = (e) => {
    console.log(e._d);
    setTrainingDate(e._d);
  };

  const submitEdit = () => {
    if (validateData()) {
      const currentDate = new Date();

      EmployeeTraining.forEach((empTrain) => {
        if (empTrain.id.toString() === item.id.toString()) {
          empTrain.trainingDate = trainingDate.toISOString();
          empTrain.modifiedDate = currentDate.toISOString();
        }
      });

      onUpdate();

      navigate("/employee-training");

      setModalEdit(!modalEdit);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Success Edit ",
        timer: 3000,
      });
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
                value={`${emp.name} - ${empDetail.nik}`}
                disabled
                type="text"
                id="employeeId"
              />
            </FormGroup>
            <FormGroup>
              <Label>Training</Label>
              <Input
                value={`${train.teacher} - ${train.theme}`}
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
