import PropTypes from "prop-types";
import { Col, Form } from "react-bootstrap";

const Searchbar = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    <Col md={4}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
        />
      </Form.Group>
    </Col>
  );
};

Searchbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Searchbar;
