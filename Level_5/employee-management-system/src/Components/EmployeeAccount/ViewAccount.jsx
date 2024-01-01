/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { Eye } from "react-bootstrap-icons";
import { format, isValid, parseISO } from "date-fns";

const DataRow = ({ label, value }) => (
  <Row>
    <Col>{label}</Col>
    <Col>{value}</Col>
  </Row>
);

const ViewAccount = ({ employeeData }) => {
  const [modalView, setModalView] = useState(false);

  const handleModalView = () => {
    setModalView(!modalView);
  };

  const formatDate = (dateString) => {
    return isValid(parseISO(dateString))
      ? format(parseISO(dateString), "dd-MM-yyyy")
      : "Invalid Date";
  };
  const formattedCreateDate = formatDate(employeeData?.created_date);
  const formattedModifiedDate = formatDate(employeeData?.updated_date);

  return (
    <>
      <Button color="info" outline onClick={handleModalView} className="mr-3">
        <Eye />
      </Button>
      <Modal isOpen={modalView} toggle={handleModalView}>
        <ModalHeader className="modal-header">Detail Employee</ModalHeader>
        <ModalBody>
          <DataRow label="Name" value={employeeData?.karyawan.name} />
          <DataRow
            label="NIK"
            value={employeeData?.karyawan.karyawanDetail.nik}
          />
          <DataRow label="Account Name" value={employeeData?.nama} />
          <DataRow label="Type" value={employeeData?.jenis} />
          <DataRow label="Account No" value={employeeData?.norek} />
          <DataRow label="Create Date" value={formattedCreateDate} />
          <DataRow label="Modify Date" value={formattedModifiedDate} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewAccount;
