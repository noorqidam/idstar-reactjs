import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
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
import EmployeesAccount from "src/Dummy/EmployeeAccount";
import Employees from "src/Dummy/Employees";
import EmployeesDetail from "src/Dummy/EmployeeDetail";

// eslint-disable-next-line react/prop-types
const AddAccount = ({ onAddAccount }) => {
  const navigate = useNavigate();

  const [modalAdd, setModalAdd] = useState(false);
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState();
  const [type, setType] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const handleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const submitAdd = () => {
    if (validateData()) {
      const ids = uuid();
      const date = new Date();
      const currentDate = format(date, "dd-MM-yyyy HH:mm:ss");

      EmployeesAccount.push({
        id: ids,
        name: name,
        type: type,
        accountNo: accountNo,
        createdDate: currentDate,
        modifiedDate: currentDate,
        deletedDate: "",
        employeeId: empId,
      });

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
                onChange={(e) => setEmpId(e.target.value)}
                required
              >
                <option value="">Select an employee</option>
                {Employees.map((employee) => {
                  const empDetail = EmployeesDetail.find(
                    (d) => d.id === employee.detail
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
