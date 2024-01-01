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
import apiConfig from "src/Config/api-config";
import { Pencil } from "react-bootstrap-icons";
import Swal from "sweetalert2";

const EditAccount = ({ employee, onUpdateAccount }) => {
  console.log(employee);
  const navigate = useNavigate();

  const empDetail = employee.karyawan.karyawanDetail;
  const [account, setAccount] = useState({
    name: employee.nama,
    accountNo: employee.norek,
    type: employee.jenis,
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

  const submitEdit = async () => {
    if (validateData()) {
      try {
        await apiConfig.put("/v1/rekening/update", {
          id: employee.id,
          nama: account.name,
          jenis: account.type,
          norek: account.accountNo,
          alamat: employee.karyawan.address,
          karyawan: {
            id: employee.karyawan.id,
          },
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
      } catch (error) {
        alertFailEdit(`Failed to edit account ${error}`);
      }
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
              <Input value={employee.nama} disabled type="text" id="name" />
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
