import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import Forms from "react-bootstrap/Form";
import apiConfig from "src/Config/api-config";

// eslint-disable-next-line react/prop-types
const AddAccount = ({ onAddAccount }) => {
  const navigate = useNavigate();

  const [modalAdd, setModalAdd] = useState(false);
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState();
  const [type, setType] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    try {
      const fetchEmployees = async () => {
        try {
          const response = await apiConfig.get(
            "/v1/karyawan/list?page=0&size=10"
          );
          setEmployees(response.data.data.content);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      if (!isInitialRender.current) {
        fetchEmployees();
      } else {
        isInitialRender.current = false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const submitAdd = async () => {
    if (validateData()) {
      try {
        const response = await apiConfig.post("/v1/rekening/save", {
          nama: name,
          jenis: type,
          norek: accountNo,
          alamat: selectedEmployee.address,
          karyawan: {
            id: empId,
          },
        });
        if (response.status === 201) {
          onAddAccount();

          setName("");
          setType("");
          setAccountNo("");
          setEmpId("");

          navigate("/account");

          setModalAdd(!modalAdd);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Success Add New Account ",
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

    if (!name.trim()) {
      alertFailAdd("Name cannot be empty");
      return false;
    }

    if (!type.trim()) {
      alertFailAdd("Type cannot be empty");
      return false;
    }

    if (!accountNo.trim()) {
      alertFailAdd("Account No cannot be empty");
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
        <ModalHeader className="modal-header">Add New Account</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Employee</Label>
              <Forms.Select
                aria-label="Default select example"
                id="empId"
                value={empId}
                onChange={(e) => {
                  const selectedEmployeeId = e.target.value;
                  setEmpId(e.target.value);
                  setSelectedEmployee(
                    employees.find(
                      (d) => d.id.toString() === selectedEmployeeId.toString()
                    )
                  );
                }}
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
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                required
                placeholder="name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Type</Label>
              <Input
                value={type}
                onChange={(e) => setType(e.target.value)}
                type="text"
                id="type"
                required
                placeholder="type"
              />
            </FormGroup>
            <FormGroup>
              <Label>Account No</Label>
              <Input
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                type="text"
                id="accountNo"
                required
                placeholder="account no"
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

export default AddAccount;
