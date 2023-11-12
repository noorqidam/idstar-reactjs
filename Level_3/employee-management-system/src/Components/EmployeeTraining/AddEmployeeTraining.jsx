import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Forms from "react-bootstrap/Form";
import Datetime from "react-datetime";
import Employees from "src/Dummy/Employees";
import EmployeesDetail from "src/Dummy/EmployeeDetail";
import Training from "src/Dummy/Training";
import EmployeeTraining from "src/Dummy/EmployeeTraining";
import "react-datetime/css/react-datetime.css";

// eslint-disable-next-line react/prop-types
const AddEmployeeTraining = ({ onAddEmpoyeeTraining }) => {
  const navigate = useNavigate();

  const [modalAdd, setModalAdd] = useState(false);
  const [empId, setEmpId] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [trainingDate, setTrainingDate] = useState("");

  const handleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const onChangeTrainingDate = (e) => {
    setTrainingDate(e._d);
  };

  const submitAdd = () => {
    if (validateData()) {
      let ids = uuid();
      const formattedTrainingDate = new Date(trainingDate).toISOString();

      EmployeeTraining.push({
        id: ids,
        employeeId: empId,
        trainingId: trainingId,
        trainingDate: formattedTrainingDate,
        createdDate: formattedTrainingDate,
        modifiedDate: formattedTrainingDate,
        deletedDate: "",
      });

      onAddEmpoyeeTraining();

      setEmpId("");
      setTrainingId("");
      setTrainingDate("");

      navigate("/employee-training");

      setModalAdd(!modalAdd);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Success Add Employee Training",
        timer: 3000,
      });
    }
  };

  const validateData = () => {
    if (!empId) {
      alertFailAdd("Please select the employee");
      return false;
    }

    if (!trainingId) {
      alertFailAdd("Please select the training");
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
        Add new Data
      </Button>

      <Modal isOpen={modalAdd} toggle={handleModalAdd}>
        <ModalHeader className="modal-header">
          Add New Employee Training
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Employee</Label>
              <Forms.Select
                aria-label="Default select example"
                id="empId"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                required
              >
                <option value="">Select an employee</option>
                {Employees.map((employee) => {
                  const empDetail = EmployeesDetail.find(
                    (d) => d.id.toString() === employee.detail.toString()
                  );
                  return (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {empDetail.nik}
                    </option>
                  );
                })}
              </Forms.Select>
            </FormGroup>
            <FormGroup>
              <Label>Training</Label>
              <Forms.Select
                aria-label="Default select example"
                id="empTrainingId"
                value={trainingId}
                onChange={(e) => setTrainingId(e.target.value)}
                required
              >
                <option value="">Select the training</option>
                {Training.map((training) => {
                  return (
                    <option key={training.id} value={training.id}>
                      {training.theme} - {training.teacher}
                    </option>
                  );
                })}
              </Forms.Select>
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

export default AddEmployeeTraining;
