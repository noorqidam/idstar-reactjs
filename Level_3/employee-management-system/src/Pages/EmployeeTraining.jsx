import { useEffect, useState } from "react";
import { Table, Container, Col, Row } from "react-bootstrap";
import { format, isValid, parseISO } from "date-fns";
import {
  AddEmployeeTraining,
  DeleteEmployeeTraining,
  EditEmployeeTraining,
  ViewEmployeeTraining,
} from "src/Components/EmployeeTraining";
import { Header, Pagination, Searchbar } from "src/Components";
import {
  Employees,
  EmployeesDetail,
  EmployeesTraining,
  Training,
} from "src/Dummy";

const EmployeeTraining = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState(5);

  useEffect(() => {
    const updatedData = EmployeesTraining.filter((item) => {
      const detail = Employees.find(
        (d) => d.id.toString() === item.employeeId.toString()
      );
      return detail.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(updatedData);
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddEmployeeTraining = () => {
    setFilteredData([...EmployeesTraining]);
  };

  const handleUpdateEmployeeTraining = () => {
    setFilteredData([...EmployeesTraining]);
  };

  const handleDelete = (id) => {
    const updatedEmployees = EmployeesTraining.filter((item) => item.id !== id);
    setFilteredData(updatedEmployees);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePaginationChange = (e) => {
    setPaginationOption(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastData = currentPage * paginationOption;
  const indexOfFirstData = indexOfLastData - paginationOption;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(EmployeesTraining.length / paginationOption);
    i++
  ) {
    pageNumbers.push(i);
  }

  const formatDate = (dateString) => {
    return isValid(parseISO(dateString))
      ? format(parseISO(dateString), "dd-MM-yyyy")
      : "Invalid Date";
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={12} className="d-flex my-2 justify-content-between">
            <h2>Employee Training</h2>
            <AddEmployeeTraining
              onAddEmpoyeeTraining={handleAddEmployeeTraining}
            />
          </Col>
        </Row>
        <Row>
          <Searchbar
            searchTerm={searchTerm}
            onSearchChange={handleChange}
            placeholder="Search by name"
          />
          <Table
            className="text-center"
            responsive
            size="sm"
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Nik</th>
                <th>Training</th>
                <th>Teacher</th>
                <th>Training Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData && currentData.length > 0 ? (
                currentData.map((item, index) => {
                  const emp = Employees.find(
                    (d) => d.id.toString() === item.employeeId.toString()
                  );
                  const empDetail = EmployeesDetail.find(
                    (d) => d.id.toString() === emp.detail.toString()
                  );
                  const train = Training.find(
                    (d) => d.id.toString() === item.trainingId.toString()
                  );
                  const data = { item, emp, empDetail, train };
                  const formattedTrainingDate = formatDate(item?.trainingDate);
                  return (
                    <tr key={item.id}>
                      <td>{indexOfFirstData + index + 1}</td>
                      <td>{emp.name}</td>
                      <td>{empDetail.nik}</td>
                      <td>{train.theme}</td>
                      <td>{train.teacher}</td>
                      <td>{formattedTrainingDate}</td>
                      <td>
                        <ViewEmployeeTraining employee={data} />
                        &nbsp;
                        <EditEmployeeTraining
                          employee={data}
                          onUpdate={handleUpdateEmployeeTraining}
                        />
                        &nbsp;
                        <DeleteEmployeeTraining
                          id={item.id}
                          handleDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No Data Available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
        <Row className="align-items-center">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredData.length}
            itemsPerPage={paginationOption}
            onPageChange={handlePaginationClick}
            onItemsPerPageChange={handlePaginationChange}
          />
        </Row>
      </Container>
    </>
  );
};

export default EmployeeTraining;
