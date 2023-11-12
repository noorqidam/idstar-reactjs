/* eslint-disable react/prop-types */
import { useState } from "react";
import { Eye } from "react-bootstrap-icons";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";

const ViewEmployee = ({ employee }) => {
  const { item, detail } = employee;
  const [modalView, setModalView] = useState(false);

  const handleModalView = () => {
    setModalView(!modalView);
  };

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
            <Col>{item?.name}</Col>
          </Row>
          <Row>
            <Col>Address</Col>
            <Col>{item?.address}</Col>
          </Row>
          <Row>
            <Col>Birthdate</Col>
            <Col>{item?.birthdate}</Col>
          </Row>
          <Row>
            <Col>NIK</Col>
            <Col>{detail?.nik}</Col>
          </Row>
          <Row>
            <Col>NPWP</Col>
            <Col>{detail?.npwp}</Col>
          </Row>
          <Row>
            <Col>Status</Col>
            <Col>{item?.status}</Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewEmployee;
