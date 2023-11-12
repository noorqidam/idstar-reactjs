/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { Eye } from "react-bootstrap-icons";
import { format, isValid, parseISO } from "date-fns";
import EmployeesTraining from "src/Dummy/EmployeeTraining";
import Employees from "src/Dummy/Employees";
import EmployeesDetail from "src/Dummy/EmployeeDetail";

const ViewTraining = ({ data }) => {
  const { item } = data;

  const [modalView, setModalView] = useState(false);

  const handleModalView = () => {
    setModalView(!modalView);
  };

  const employeesForTraining = EmployeesTraining.filter(
    (empTrain) => empTrain.trainingId === item.id
  );

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
        <ModalHeader className="modal-header">Detail Training</ModalHeader>
        <ModalBody>
          <Row>
            <Col>Teacher</Col>
            <Col>{item?.teacher}</Col>
          </Row>
          <Row>
            <Col>Theme</Col>
            <Col>{item?.theme}</Col>
          </Row>
          <Row>
            <Col>Create Date</Col>
            <Col>{formattedCreateDate}</Col>
          </Row>
          <Row>
            <Col>Modify Date</Col>
            <Col>{formattedModifiedDate}</Col>
          </Row>
          <Row>
            <Col>List Employee</Col>
            <Col>
              {employeesForTraining.length > 0 ? (
                employeesForTraining.map((empTrain) => {
                  const emp = Employees.find(
                    (d) => d.id.toString() === empTrain.employeeId.toString()
                  );
                  const empDetail = EmployeesDetail.find(
                    (d) => d.id.toString() === emp.detail.toString()
                  );
                  return (
                    <tr key={empTrain.id}>
                      <td>
                        - {emp.name} - {empDetail.nik}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>Not available</p>
              )}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewTraining;
