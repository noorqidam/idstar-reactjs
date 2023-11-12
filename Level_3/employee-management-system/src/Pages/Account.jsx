import { useEffect, useState } from "react";
import { Table, Container, Col, Row } from "react-bootstrap";
import { Employees, EmployeeAccount } from "src/Dummy";
import {
  AddAccount,
  DeleteAccount,
  EditAccount,
  ViewAccount,
} from "src/Components/EmployeeAccount";
import { Header, Pagination, Searchbar } from "src/Components";

const AccountPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState(5);

  useEffect(() => {
    const updatedData = EmployeeAccount.filter((item) => {
      const detail = Employees.find(
        (d) => d.id.toString() === item.employeeId.toString()
      );
      return detail.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(updatedData);
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddAccount = () => {
    setFilteredData([...EmployeeAccount]);
  };

  const handleUpdateAccount = () => {
    setFilteredData([...EmployeeAccount]);
  };

  const handleDelete = (id) => {
    const updatedEmployees = EmployeeAccount.filter((item) => item.id !== id);
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
    i <= Math.ceil(EmployeeAccount.length / paginationOption);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={12} className="d-flex my-2 justify-content-between">
            <h2>List Employee</h2>
            <AddAccount onAddAccount={handleAddAccount} />
          </Col>
        </Row>
        <Searchbar
          searchTerm={searchTerm}
          onSearchChange={handleChange}
          placeholder="Search by name"
        />
        <Row>
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
                <th>Account Name</th>
                <th>Type</th>
                <th>Account No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData && currentData.length > 0 ? (
                currentData.map((item, index) => {
                  const detail = Employees.find(
                    (d) => d.id.toString() === item.employeeId.toString()
                  );
                  return (
                    <tr key={item.id}>
                      <td>{indexOfFirstData + index + 1}</td>
                      <td>{detail?.name}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.accountNo}</td>
                      <td className="d-flex justify-content-center">
                        <ViewAccount employee={{ item, detail }} />
                        &nbsp;
                        <EditAccount
                          employee={{ item, detail }}
                          onUpdateAccount={handleUpdateAccount}
                        />
                        &nbsp;
                        <DeleteAccount
                          id={item.id}
                          handleDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No Data Available</td>
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

export default AccountPage;
