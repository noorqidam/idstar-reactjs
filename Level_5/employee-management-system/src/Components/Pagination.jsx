import PropTypes from "prop-types";
import { Pagination, Form } from "react-bootstrap";

const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.First onClick={() => onPageChange(1)} />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        />
        <Pagination.Last onClick={() => onPageChange(pageNumbers.length)} />
      </Pagination>
      <Form.Select
        size="sm"
        aria-label="Default select example"
        onChange={onItemsPerPageChange}
        value={itemsPerPage}
        className="select-page ms-2"
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </Form.Select>
    </div>
  );
};

PaginationComponent.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
