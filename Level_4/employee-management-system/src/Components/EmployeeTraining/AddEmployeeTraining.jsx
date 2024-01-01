import { useEffect, useState, useRef } from "react";
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
import { format } from "date-fns";
import Swal from "sweetalert2";
import Forms from "react-bootstrap/Form";
import Datetime from "react-datetime";
import apiConfig from "src/Config/api-config";
import "react-datetime/css/react-datetime.css";

// eslint-disable-next-line react/prop-types
const AddEmployeeTraining = ({ onAddEmployeeTraining }) => {
  const navigate = useNavigate();

  const [modalAdd, setModalAdd] = useState(false);
  const [empId, setEmpId] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [trainingDate, setTrainingDate] = useState("");
  const [training, setTraining] = useState([]);
  const [employees, setEmployees] = useState([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await apiConfig.get(
          "/v1/training/list?page=0&size=10"
        );
        setTraining(response.data.data.content);
      } catch (error) {
        console.error("Error fetching training data:", error);
      }
    };

    const fetchEmployeesData = async () => {
      try {
        const response = await apiConfig.get(
          "/v1/karyawan/list?page=0&size=10"
        );
        setEmployees(response.data.data.content);
      } catch (error) {
        console.error("Error fetching employees data:", error);
      }
    };

    if (!isInitialRender.current) {
      fetchTrainingData();
      fetchEmployeesData();
    } else {
      isInitialRender.current = false;
    }
  }, []);

  const handleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const onChangeTrainingDate = (e) => {
    setTrainingDate(e._d);
  };

  const submitAdd = async () => {
    if (validateData()) {
      try {
        const response = await apiConfig.post("/v1/karyawan-training/save", {
          karyawan: {
            id: empId,
          },
          training: {
            id: trainingId,
          },
          training_date: format(trainingDate, "yyyy-MM-dd HH:mm:ss"),
        });

        if (response.status === 201) {
          onAddEmployeeTraining();
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
      } catch (error) {
        console.error("Error adding employee training:", error);
        alertFailAdd("Error adding employee training");
      }
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
                {employees.map((employee) => {
                  const empDetail = employee.karyawanDetail;
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
                {training.map((training) => {
                  return (
                    <option key={training.id} value={training.id}>
                      {training.tema} - {training.pengajar}
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
