/* eslint-disable react/prop-types */
import { useState } from "react";
import { Eye } from "react-bootstrap-icons";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { format, isValid, parseISO } from "date-fns";

const DataRow = ({ label, value }) => (
  <Row>
    <Col>{label}</Col>
    <Col>{value}</Col>
  </Row>
);

const ViewEmployeeTraining = ({ employee }) => {
  const { item, emp, empDetail, train } = employee;

  const [modalView, setModalView] = useState(false);

  const handleModalView = () => {
    setModalView(!modalView);
  };

  const formatDate = (dateString) => {
    return isValid(parseISO(dateString))
      ? format(parseISO(dateString), "dd-MM-yyyy")
      : "Invalid Date";
  };

  const formattedTrainingDate = formatDate(item?.trainingDate);
  const formattedCreateDate = formatDate(item?.createdDate);
  const formattedModifiedDate = formatDate(item?.modifiedDate);

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
          <DataRow label="Name" value={emp?.name} />
          <DataRow label="NIK" value={empDetail?.nik} />
          <DataRow label="Training Date" value={formattedTrainingDate} />
          <DataRow label="Theme" value={train?.theme} />
          <DataRow label="Teacher" value={train?.teacher} />
          <DataRow label="Created Date" value={formattedCreateDate} />
          <DataRow label="Modified Date" value={formattedModifiedDate} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewEmployeeTraining;
