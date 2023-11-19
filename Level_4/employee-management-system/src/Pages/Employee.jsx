import { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import apiConfig from "src/Config/api-config";
import { Header, Pagination, Searchbar } from "src/Components";
import { AddEmployee, ViewEmployee } from "src/Components/Employee";

const Employee = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationOption, setPaginationOption] = useState(5);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConfig.get("/v1/karyawan/list", {
          params: {
            page: currentPage - 1,
            size: paginationOption,
          },
        });

        setData(response.data.data.content);
        setFilteredData(response.data.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, paginationOption]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    filterData(e.target.value);
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
                  <th>NIK</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.karyawanDetail.nik}</td>
                      <td>{item.address}</td>
                      <td>{item.status}</td>
                      <td className="d-flex justify-content-center">
                        <ViewEmployee employeeData={item} />
                        &nbsp;
                      </td>
                    </tr>
                  ))
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
              onPageChange={handlePaginationChange}
              onItemsPerPageChange={handleItemPerPageChange}
            />
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default Employee;
