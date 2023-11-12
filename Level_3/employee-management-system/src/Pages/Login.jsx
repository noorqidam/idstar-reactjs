import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { UserAccount } from "src/Dummy";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (validateLogin()) {
      alertSuccess("Welcome " + formData.username);
      navigate("/employee");
    }
  };

  const validateLogin = () => {
    const user = UserAccount.find(
      (item) => item.username === formData.username
    );
    if (!user) {
      failedLogin("Username Not Found");
      return false;
    }

    if (!formData.password || formData.password !== user.password) {
      failedLogin("Incorrect Password");
      return false;
    }

    return true;
  };

  const alertSuccess = (text) => {
    Swal.fire({
      title: "Success",
      icon: "success",
      text: text,
      timer: 3000,
    });
  };

  const failedLogin = (text) => {
    Swal.fire({
      title: "Failed",
      icon: "error",
      text: text,
      timer: 3000,
    });
  };

  return (
    <Container className="container-login">
      <Row className="row-login">
        <Col md={6} className="col-title">
          <h1 className="title-login">Sistem Manajemen Pegawai</h1>
        </Col>
        <Col md={6}>
          <div className="card-form-login">
            <h3 className="title-form">Login</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-2">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <EyeSlash size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </span>
                  </div>
                </div>
              </Form.Group>

              <Button className="button-login mt-3" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
