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
  Label,
  FormGroup,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FormCheck } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import apiConfig from "src/Config/api-config";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const EditEmployee = ({ employee, onUpdateEmployee }) => {
  const navigate = useNavigate();

  const [name, setName] = useState(employee.name);
  const [address, setAddress] = useState(employee.address);
  const [status, setStatus] = useState(employee.status);
  const [nik, setNik] = useState(employee.karyawanDetail.nik);
  const [npwp, setNpwp] = useState(employee.karyawanDetail.npwp);
  const [birthdate, setBirthdate] = useState(
    moment(employee.dob).format("DD-MM-YYYY")
  );
  const [modalEdit, setModalEdit] = useState(false);

  const handleChange = () => {
    setStatus(!status);
  };

  const handleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const onChangeBirthDate = (e) => {
    setBirthdate(e._d);
  };

  const submitEdit = async () => {
    if (validateData()) {
      try {
        await apiConfig.put("/v1/karyawan/update", {
          id: employee.id,
          name,
          dob: moment(birthdate).format("YYYY-MM-DD"),
          status: status ? "active" : "inactive",
          address,
          karyawanDetail: {
            nik,
            npwp,
          },
        });

        onUpdateEmployee();
        navigate("/employee");
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
    if (!name.trim()) {
      alertFailEdit("Name cannot be empty");
      return false;
    }

    if (!address.trim()) {
      alertFailEdit("Address cannot be empty");
      return false;
    }

    if (!birthdate) {
      alertFailEdit("Birthdate cannot be empty");
      return false;
    }

    if (!nik.trim()) {
      alertFailEdit("NIK cannot be empty");
      return false;
    }

    if (!npwp.trim()) {
      alertFailEdit("NPWP cannot be empty");
      return false;
    }

    return true;
  };

  function alertFailEdit(text) {
    Swal.fire({
      title: "Failed",
      icon: "warning",
      text: text,
      timer: 3000,
    });
  }

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
        <ModalHeader className="modal-header">Edit Employee</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                required
                placeholder={name}
              />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
                required
                placeholder={address}
              />
            </FormGroup>
            <FormGroup>
              <Label>Birthdate</Label>
              <Datetime
                locale="en"
                timeFormat={false}
                dateFormat="DD-MM-YYYY"
                initialValue={moment(new Date()).format("DD-MM-YYYY")}
                value={birthdate}
                onChange={(date) => {
                  onChangeBirthDate(date);
                }}
                inputProps={{ placeholder: "Birthdate", readOnly: true }}
                className="w-100 me-1"
              />
            </FormGroup>
            <FormGroup>
              <Label>NIK</Label>
              <Input
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                type="text"
                id="nik"
                required
                placeholder={nik}
              />
            </FormGroup>
            <FormGroup>
              <Label>NPWP</Label>
              <Input
                value={npwp}
                onChange={(e) => setNpwp(e.target.value)}
                type="text"
                id="npwp"
                required
                placeholder={npwp}
              />
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              <FormCheck
                type="switch"
                color="secondary"
                checked={status}
                onChange={handleChange}
                name="status"
              />
              {status ? "Active" : "Inactive"}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="button-submit" onClick={submitEdit}>
            Submit
          </Button>
          <Button color="secondary" onClick={handleModalEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default EditEmployee;
