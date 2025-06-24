import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container"; 

function App() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: "1",
    isCompleted: false,
  });

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;
    setFormData((prevData) => ({
      ...prevData, // On décompose le formulaire existant pour garder toutes les valeurs
      [name]: type === "checkbox" ? checked : value, // On met à jour le champ en question grâce aux attributs name et value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
     <Container className="d-flex justify-content-center align-items-center vh-100">
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Group controlId="name_input">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={formData.name}
            placeholder="Nom"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="date_input">
          <Form.Label>Date</Form.Label>
          <Form.Control
            required
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="select_input">
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            aria-label="select_priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="1">Basse</option>
            <option value="2">Moyenne</option>
            <option value="3">Haute</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group controlId="checkbox_input">
          <Form.Label>isCompleted</Form.Label>
          <Form.Check
            inline
            name="isCompleted"
            type="checkbox"
            id="checkbox"
            onChange={handleChange}
            checked={formData.isChecked}
          />
        </Form.Group>
      </Row>
      <Button type="submit">Soumettre le formulaire</Button>
    </Form>
    </Container>
  );
}

export default App;
