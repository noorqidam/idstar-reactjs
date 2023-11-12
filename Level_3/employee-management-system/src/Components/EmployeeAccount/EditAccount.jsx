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
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Pencil } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { EmployeeAccount, EmployeesDetail } from "src/Dummy";

const EditAccount = ({ employee, onUpdateAccount }) => {
  const navigate = useNavigate();

  const { item, detail } = employee;
  const empDetail = EmployeesDetail.find(
    (d) => d.id.toString() === detail?.detail.toString()
  );
  const [account, setAccount] = useState({
    name: item.name,
    accountNo: item.accountNo,
    type: item.type,
  });

  const handleAccountNameChange = (e) => {
    setAccount({ ...account, name: e.target.value });
  };

  const handleAccountNoChange = (e) => {
    setAccount({ ...account, accountNo: e.target.value });
  };

  const handleTypeChange = (e) => {
    setAccount({ ...account, type: e.target.value });
  };
  const [modalEdit, setModalEdit] = useState(false);

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const submitEdit = () => {
    if (validateData()) {
      let date = new Date();
      const currentDate = format(date, "dd-MM-yyyy HH:mm:ss");

      EmployeeAccount.forEach((acc) => {
        if (
          acc.id.toString() === item.id.toString() &&
          acc.employeeId.toString() === detail.id.toString()
        ) {
          acc.name = account.name;
          acc.type = account.type;
          acc.accountNo = account.accountNo;
          acc.modifiedDate = currentDate;
        }
      });

      onUpdateAccount();

      navigate("/account");

      setModalEdit(!modalEdit);
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Success Edit",
        timer: 3000,
      });
    }
  };

  const validateData = () => {
    if (!account.name.trim()) {
      alertFailEdit("Account Name cannot be empty");
      return false;
    }

    if (!account.type.trim()) {
      alertFailEdit("Type cannot be empty");
      return false;
    }

    if (!account.accountNo.trim()) {
      alertFailEdit("Account No cannot be empty");
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
        <ModalHeader className="modal-header">Edit Account</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input value={detail?.name} disabled type="text" id="name" />
            </FormGroup>
            <FormGroup>
              <Label>NIK</Label>
              <Input value={empDetail?.nik} disabled type="text" id="nik" />
            </FormGroup>
            <FormGroup>
              <Label>Account Name</Label>
              <Input
                value={account.name}
                onChange={handleAccountNameChange}
                type="text"
                id="accountName"
                required
                placeholder={account.name}
              />
            </FormGroup>
            <FormGroup>
              <Label>Type</Label>
              <Input
                value={account.type}
                onChange={handleTypeChange}
                type="text"
                id="type"
                required
                placeholder={account.type}
              />
            </FormGroup>
            <FormGroup>
              <Label>Account No</Label>
              <Input
                value={account.accountNo}
                onChange={handleAccountNoChange}
                type="text"
                id="accountNo"
                required
                placeholder={account.accountNo}
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

export default EditAccount;
