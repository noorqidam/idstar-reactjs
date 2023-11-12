import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import {
  AddTraining,
  DeleteTraining,
  EditTraining,
  ViewTraining,
} from "src/Components/Training";
import { Header, Pagination, Searchbar } from "src/Components";
import { Training } from "src/Dummy";

const TrainingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState(5);

  useEffect(() => {
    const updatedData = Training.filter((item) =>
      item.theme.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(updatedData);
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddTraining = () => {
    setFilteredData([...Training]);
  };

  const handleUpdateTraining = () => {
    setFilteredData([...Training]);
  };

  const handleDelete = (id) => {
    const updatedEmployees = Training.filter((item) => item.id !== id);
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

  const handleItemPerPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastData = currentPage * paginationOption;
  const indexOfFirstData = indexOfLastData - paginationOption;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Training.length / paginationOption); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={12} className="d-flex my-2 justify-content-between">
            <h2>List Training</h2>
            <AddTraining onAddTraining={handleAddTraining} />
          </Col>
        </Row>
        <Row>
          <Searchbar
            searchTerm={searchTerm}
            onSearchChange={handleChange}
            placeholder="Search by theme"
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
                <th>Teacher</th>
                <th>Theme</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData && currentData.length > 0 ? (
                currentData.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{indexOfFirstData + index + 1}</td>
                      <td>{item.teacher}</td>
                      <td>{item.theme}</td>
                      <td>
                        <ViewTraining data={{ item }} />
                        &nbsp;
                        <EditTraining
                          data={{ item }}
                          onUpdateTraining={handleUpdateTraining}
                        />
                        &nbsp;
                        <DeleteTraining
                          id={item.id}
                          handleDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">No Data Available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
        <Row className="align-items-center">
          <Pagination
            totalItems={filteredData.length}
            itemsPerPage={paginationOption}
            currentPage={currentPage}
            onPageChange={handlePaginationChange}
            onItemsPerPageChange={handleItemPerPageChange}
          />
        </Row>
      </Container>
    </>
  );
};

export default TrainingPage;
