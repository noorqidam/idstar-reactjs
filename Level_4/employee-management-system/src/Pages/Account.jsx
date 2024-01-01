import { useEffect, useState, useRef } from "react";
import { Table, Container, Col, Row } from "react-bootstrap";
import {
  AddAccount,
  DeleteAccount,
  EditAccount,
  ViewAccount,
} from "src/Components/EmployeeAccount";
import { Header, Pagination, Searchbar } from "src/Components";
import apiConfig from "src/Config/api-config";

const Account = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [paginationOption, setPaginationOption] = useState(5);
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
      const response = await apiConfig.get("/v1/rekening/list", {
        params: {
          page: currentPage - 1,
          size: paginationOption,
        },
      });

      setTotalItems(response.data.data.totalElements);

      const responseData = response.data.data;
      if (responseData.content.length > 0) {
        setData(response.data.data.content);
        setFilteredData(responseData.content);
      } else {
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleAddAccount = async () => {
    await fetchData();
  };

  const handleUpdateAccount = async () => {
    await fetchData();
  };

  const handleDelete = async () => {
    await fetchData();
  };

  const filterData = (value) => {
    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.karyawan.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    filterData(value, data);
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
            <h2>List Account</h2>
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
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        {(currentPage - 1) * paginationOption + index + 1}
                      </td>
                      <td>{item.karyawan.name}</td>
                      <td>{item.nama}</td>
                      <td>{item.jenis}</td>
                      <td>{item.norek}</td>
                      <td className="d-flex justify-content-center">
                        <ViewAccount employeeData={item} />
                        &nbsp;
                        <EditAccount
                          employee={item}
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
            totalItems={totalItems}
            itemsPerPage={paginationOption}
            onPageChange={handlePaginationChange}
            onItemsPerPageChange={handleItemPerPageChange}
          />
        </Row>
      </Container>
    </>
  );
};

export default Account;
