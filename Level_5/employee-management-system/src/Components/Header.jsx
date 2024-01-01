import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">SM Pegawai</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigateTo("/employee")}>Pegawai</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/employee-training")}>
              Pelatihan
            </Nav.Link>
            <Nav.Link onClick={() => navigateTo("/training")}>Kelas</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/account")}>Account</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigateTo("/")}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
