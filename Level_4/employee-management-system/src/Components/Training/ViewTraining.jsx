/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import apiConfig from "src/Config/api-config";
import { Eye } from "react-bootstrap-icons";
import moment from "moment";

const ViewTraining = ({ data }) => {
  const { item } = data;

  const [modalView, setModalView] = useState(false);
  const [employeesForTraining, setEmployeesForTraining] = useState([]);

  const handleModalView = () => {
    setModalView(!modalView);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConfig.get(
          "/v1/karyawan-training/list?page=0&size=10"
        );

        setEmployeesForTraining(response.data.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (modalView) {
      fetchData();
    }
  }, [modalView]);

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
            <Col>{item?.pengajar}</Col>
          </Row>
          <Row>
            <Col>Theme</Col>
            <Col>{item?.tema}</Col>
          </Row>
          <Row>
            <Col>Create Date</Col>
            <Col>{moment(item?.created_date).format("DD-MM-YYYY")}</Col>
          </Row>
          <Row>
            <Col>Modify Date</Col>
            <Col>{moment(item?.created_date).format("DD-MM-YYYY")}</Col>
          </Row>
          <Row>
            <Col>List Employee</Col>
            <Col>
              {employeesForTraining.length > 0 ? (
                <table>
                  <tbody>
                    {employeesForTraining.map((empTrain) => {
                      const emp = empTrain.karyawan;
                      const empDetail = empTrain.karyawan.karyawanDetail;
                      return (
                        <tr key={empTrain.id}>
                          <td>
                            <div>
                              - {emp.name} - {empDetail.nik}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div>Not available</div>
              )}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewTraining;
