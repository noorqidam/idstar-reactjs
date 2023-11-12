/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { Eye } from "react-bootstrap-icons";
import { format, isValid, parseISO } from "date-fns";
import EmployeesDetail from "src/Dummy/EmployeeDetail";

const DataRow = ({ label, value }) => (
  <Row>
    <Col>{label}</Col>
    <Col>{value}</Col>
  </Row>
);

const ViewAccount = ({ employee }) => {
  const { item, detail } = employee;
  const [modalView, setModalView] = useState(false);

  const handleModalView = () => {
    setModalView(!modalView);
  };

  const empDetail = EmployeesDetail.find((d) => d.id === detail?.detail);

  const formatDate = (dateString) => {
    return isValid(parseISO(dateString))
      ? format(parseISO(dateString), "dd-MM-yyyy")
      : "Invalid Date";
  };
  const formattedCreateDate = formatDate(item?.createdDate);
  const formattedModifiedDate = formatDate(item?.modifiedDate);

  return (
    <>
      <Button color="info" outline onClick={handleModalView} className="mr-3">
        <Eye />
      </Button>
      <Modal isOpen={modalView} toggle={handleModalView}>
        <ModalHeader className="modal-header">Detail Employee</ModalHeader>
        <ModalBody>
          <DataRow label="Name" value={detail?.name} />
          <DataRow label="NIK" value={empDetail?.nik} />
          <DataRow label="Account Name" value={item?.name} />
          <DataRow label="Type" value={item?.type} />
          <DataRow label="Account No" value={item?.accountNo} />
          <DataRow label="Create Date" value={formattedCreateDate} />
          <DataRow label="Modify Date" value={formattedModifiedDate} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewAccount;
