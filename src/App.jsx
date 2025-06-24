import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      priority: "1",
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Données du formulaire soumises (valides) :", data);
    reset();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group controlId="name_input">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom"
              {...register("name", { required: "Le nom est requis." })}
              isInvalid={!!errors.name} // convertit en booléen strict donc si errors.name existe alors ce serait true
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="date_input">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              {...register("date", { required: "La date est requise." })}
              isInvalid={!!errors.date}
            />
          <Form.Control.Feedback type="invalid">
            {errors.date?.message}
          </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="select_input">
            <Form.Label>Priorité</Form.Label>
            <Form.Select
              aria-label="select_priority"
              {...register("priority")}
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
              type="checkbox"
              id="isCompleted_checkbox"
              {...register("isCompleted")}
            />
          </Form.Group>
        </Row>
        <div>
          <Button type="submit" variant="primary">
            Soumettre le formulaire
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default App;
