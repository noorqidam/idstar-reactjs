import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiConfig from "src/Config/api-config";
import { format } from "date-fns";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
  Label,
  FormGroup,
} from "reactstrap";
import { FormCheck } from "react-bootstrap";
import Swal from "sweetalert2";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

// eslint-disable-next-line react/prop-types
const AddEmployee = ({ onAddEmployee }) => {
  const navigate = useNavigate();

  const [modalAdd, setModalAdd] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(true);
  const [nik, setNik] = useState("");
  const [npwp, setNpwp] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const toggleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const toggleStatus = () => {
    setStatus(!status);
  };

  const handleBirthDateChange = (e) => {
    setBirthdate(e.toDate());
  };

  const validateData = () => {
    if (!name.trim() || !address.trim() || !nik.trim() || !npwp.trim()) {
      alertFail("Name, Address, NIK, and NPWP cannot be empty");
      return false;
    }
    return true;
  };

  const alertFail = (text) => {
    Swal.fire({
      title: "Failed",
      icon: "warning",
      text: text,
      timer: 3000,
    });
  };

  const submitAdd = async () => {
    if (validateData()) {
      try {
        await apiConfig.post("/v1/karyawan/save", {
          name,
          dob: format(birthdate, "yyyy-MM-dd"),
          status: status ? "active" : "inactive",
          address,
          karyawanDetail: {
            nik,
            npwp,
          },
        });

        setName("");
        setAddress("");
        setNik("");
        setNpwp("");
        setStatus(true);
        setBirthdate(new Date());

        navigate("/employee");
        if (onAddEmployee) {
          onAddEmployee();
        }
        toggleModalAdd();
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Success Add New Employee",
          timer: 3000,
        });
      } catch (error) {
        alertFail(`Failed to add a new employee ${error}`);
      }
    }
  };

  return (
    <>
      <Button className="button-add" onClick={toggleModalAdd}>
        Add new Data
      </Button>

      <Modal isOpen={modalAdd} toggle={toggleModalAdd}>
        <ModalHeader className="modal-header">Add New Employee</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
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
              <Label htmlFor="address">Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                id="address"
                required
                placeholder="address"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="birthdate">Birthdate</Label>
              <Datetime
                locale="en"
                timeFormat={false}
                dateFormat="DD-MM-YYYY"
                initialValue={format(new Date(), "dd-MM-yyyy")}
                value={birthdate}
                onChange={handleBirthDateChange}
                inputProps={{ placeholder: "Birthdate", readOnly: true }}
                className="w-100 me-1"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="nik">NIK</Label>
              <Input
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                type="text"
                id="nik"
                required
                placeholder="nik"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="npwp">NPWP</Label>
              <Input
                value={npwp}
                onChange={(e) => setNpwp(e.target.value)}
                type="text"
                id="npwp"
                required
                placeholder="npwp"
              />
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              <FormCheck
                type="switch"
                checked={status}
                onChange={toggleStatus}
                color="secondary"
              />
              {status ? "Active" : "Inactive"}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="button-submit" onClick={submitAdd}>
            Submit
          </Button>
          <Button color="secondary" onClick={toggleModalAdd}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddEmployee;
