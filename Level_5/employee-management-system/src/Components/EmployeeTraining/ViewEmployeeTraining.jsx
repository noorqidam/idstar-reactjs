/* eslint-disable react/prop-types */
import { useState } from "react";
import { Eye } from "react-bootstrap-icons";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import moment from "moment";

const DataRow = ({ label, value }) => (
  <Row>
    <Col>{label}</Col>
    <Col>{value}</Col>
  </Row>
);

const ViewEmployeeTraining = ({ employee }) => {
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
        <ModalHeader className="modal-header">
          Detail Employee Training
        </ModalHeader>
        <ModalBody>
          <DataRow label="Name" value={employee?.training.pengajar} />
          <DataRow label="NIK" value={employee?.karyawan.karyawanDetail.nik} />
          <DataRow
            label="Training Date"
            value={moment(employee.training_date).format("DD-MM-YYYY")}
          />
          <DataRow label="Theme" value={employee?.training.tema} />
          <DataRow label="Teacher" value={employee?.training.pengajar} />
          <DataRow
            label="Created Date"
            value={moment(employee.created_date).format("YYYY-MM-DD")}
          />
          <DataRow
            label="Modified Date"
            value={moment(employee.updated_date).format("YYYY-MM-DD")}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewEmployeeTraining;
