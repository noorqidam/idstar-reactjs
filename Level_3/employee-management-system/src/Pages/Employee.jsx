/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import {
  AddEmployee,
  DeleteEmployee,
  EditEmployee,
  ViewEmployee,
} from "src/Components/Employee";
import { Header, Pagination, Searchbar } from "src/Components";
import { Employees, EmployeesDetail } from "src/Dummy";

const EmployeeTable = ({ currentData, handleDelete, indexOfFirstData }) => (
  <Table className="text-center" responsive size="sm" striped bordered hover>
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>NIK</th>
        <th>Birthdate</th>
        <th>Address</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {currentData && currentData.length > 0 ? (
        currentData.map((item, index) => {
          const detail = EmployeesDetail.find(
            (d) => d.id.toString() === item.detail.toString()
          );
          return (
            <tr key={item.id}>
              <td>{indexOfFirstData + index + 1}</td>
              <td>{item.name}</td>
              <td>{detail.nik}</td>
              <td>{item.birthdate}</td>
              <td>{item.address}</td>
              <td>{item.status}</td>
              <td className="d-flex justify-content-center">
                <ViewEmployee employee={{ item, detail }} />
                &nbsp;
                <EditEmployee employee={{ item, detail }} />
                &nbsp;
                <DeleteEmployee id={item.id} handleDelete={handleDelete} />
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
);

const EmployeeList = ({ currentData, handleDelete, indexOfFirstData }) => (
  <Row>
    <EmployeeTable
      currentData={currentData}
      handleDelete={handleDelete}
      indexOfFirstData={indexOfFirstData}
    />
  </Row>
);

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState(5);

  useEffect(() => {
    const updatedData = Employees.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(updatedData);
  }, [searchTerm]);

  const handleDelete = (id) => {
    const updatedEmployees = Employees.filter((item) => item.id !== id);
    setFilteredData(updatedEmployees);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleItemPerPageChange = (e) => {
    setPaginationOption(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastData = currentPage * paginationOption;
  const indexOfFirstData = indexOfLastData - paginationOption;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Employees.length / paginationOption); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={12} className="d-flex my-2 justify-content-between">
            <h2>List Employee</h2>
            <AddEmployee />
          </Col>
        </Row>
        <Row>
          <Searchbar
            searchTerm={searchTerm}
            onSearchChange={handleChange}
            placeholder="Search by name"
          />
          <EmployeeList
            currentData={currentData}
            handleDelete={handleDelete}
            indexOfFirstData={indexOfFirstData}
          />
        </Row>
        <Row className="align-items-center">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredData.length}
            itemsPerPage={paginationOption}
            onPageChange={handlePaginationChange}
            onItemsPerPageChange={handleItemPerPageChange}
          />
        </Row>
      </Container>
    </>
  );
};

export default Employee;
