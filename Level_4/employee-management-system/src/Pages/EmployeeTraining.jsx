import { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import apiConfig from "src/Config/api-config";
import { Header, Pagination, Searchbar } from "src/Components";
import {
  AddEmployeeTraining,
  EditEmployeeTraining,
  DeleteEmployeeTraining,
  ViewEmployeeTraining,
} from "src/Components/EmployeeTraining";

const EmployeeTraining = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
      fetchData();
    } else {
      isInitialRender.current = false;
    }
  }, [currentPage, paginationOption]);

  const fetchData = async () => {
    try {
      const response = await apiConfig.get("/v1/karyawan-training/list", {
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

  const handleAddEmployee = async () => {
    await fetchData();
  };

  const handleDelete = async () => {
    await fetchData();
  };

  const onUpdateEmployee = async () => {
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
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleItemPerPageChange = (e) => {
    setPaginationOption(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={12} className="d-flex my-2 justify-content-between">
            <h2>List Employee Training</h2>
            <AddEmployeeTraining onAddEmployeeTraining={handleAddEmployee} />
          </Col>
        </Row>
        <Row>
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
                  <th>Nik</th>
                  <th>Training</th>
                  <th>Teacher</th>
                  <th>Training Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.karyawan.name}</td>
                      <td>{item.karyawan.karyawanDetail.nik}</td>
                      <td>{item.training.tema}</td>
                      <td>{item.training.pengajar}</td>
                      <td>{moment(item.training_date).format("DD-MM-YYYY")}</td>
                      <td className="d-flex justify-content-center">
                        <ViewEmployeeTraining employee={item} />
                        &nbsp;
                        <EditEmployeeTraining
                          employee={item}
                          onUpdateEmployee={onUpdateEmployee}
                        />
                        &nbsp;
                        <DeleteEmployeeTraining
                          id={item.id}
                          handleDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  ))
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
              totalItems={totalItems}
              itemsPerPage={paginationOption}
              onPageChange={handlePaginationChange}
              onItemsPerPageChange={handleItemPerPageChange}
            />
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default EmployeeTraining;
