import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import {
  AddTraining,
  EditTraining,
  DeleteTraining,
  ViewTraining,
} from "src/Components/Training";
import { Header, Pagination, Searchbar } from "src/Components";
import apiConfig from "src/Config/api-config";

const TrainingPage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage, paginationOption]);

  const fetchData = async () => {
    try {
      const response = await apiConfig.get("/v1/training/list", {
        params: {
          page: currentPage - 1,
          size: paginationOption,
        },
      });

      setData(response.data.data.content);
      setFilteredData(response.data.data.content);
      setTotalItems(response.data.data.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddTraining = async () => {
    await fetchData();
  };

  const handleUpdateTraining = async () => {
    await fetchData();
  };

  const handleDelete = async () => {
    await fetchData();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    filterData(value, data);
  };

  const filterData = (value) => {
    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.pengajar.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handlePaginationChange = (e) => {
    setPaginationOption(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleItemPerPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.pengajar}</td>
                      <td>{item.tema}</td>
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
            itemsPerPage={totalItems}
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
