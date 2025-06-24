import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    priority: "",
    isCompleted: false,
  });

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData, // On décompose le formulaire existant pour garder toutes les valeurs
      [event.target.name]: event.target.value, // On met à jour le champ en question grâce aux attributs name et value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Form.Group id="name_input">
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
          <Form.Group id="birthdate_input">
            <Form.Label>Date de naissance</Form.Label>
            <Form.Control
              required
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group id="select_input">
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
          <Form.Group id="checkbox_input">
            <Form.Label>isCompleted</Form.Label>
            <Form.Check
              inline
              label="isCompleted"
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
