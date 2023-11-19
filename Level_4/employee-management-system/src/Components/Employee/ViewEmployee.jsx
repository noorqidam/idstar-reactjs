import { useState } from "react";
import PropTypes from "prop-types";
import { Eye } from "react-bootstrap-icons";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { format, isValid, parseISO } from "date-fns";

const ViewEmployee = ({ employeeData }) => {
  const [modalView, setModalView] = useState(false);

  const handleModalView = () => {
    setModalView(!modalView);
  };

  const formatDate = (dateString) => {
    return isValid(parseISO(dateString))
      ? format(parseISO(dateString), "dd-MM-yyyy")
      : "Invalid Date";
  };

  const formattedBirthdate = formatDate(employeeData?.dob);

  return (
    <>
      <Button color="info" outline onClick={handleModalView} className="mr-3">
        <Eye />
      </Button>
      <Modal isOpen={modalView} toggle={handleModalView}>
        <ModalHeader className="modal-header">Detail Employee</ModalHeader>
        <ModalBody>
          <Row>
            <Col>Name</Col>
            <Col>{employeeData?.name}</Col>
          </Row>
          <Row>
            <Col>Address</Col>
            <Col>{employeeData?.address}</Col>
          </Row>
          <Row>
            <Col>Birthdate</Col>
            <Col>{formattedBirthdate}</Col>
          </Row>
          <Row>
            <Col>NIK</Col>
            <Col>{employeeData.karyawanDetail?.nik}</Col>
          </Row>
          <Row>
            <Col>NPWP</Col>
            <Col>{employeeData.karyawanDetail?.npwp}</Col>
          </Row>
          <Row>
            <Col>Status</Col>
            <Col>{employeeData?.status}</Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

ViewEmployee.propTypes = {
  employeeData: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    dob: PropTypes.string,
    karyawanDetail: PropTypes.shape({
      nik: PropTypes.string,
      npwp: PropTypes.string,
    }),
    status: PropTypes.string,
  }),
};

export default ViewEmployee;
