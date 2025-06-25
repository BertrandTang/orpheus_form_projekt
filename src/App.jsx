import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(8, "Le nom doit faire au moins 8 caractères")
    .max(15, "Le nom doit faire au moins 15 caractères")
    .required("Le nom est requis"),
  date: yup
    .string()
    .matches(
      /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Le format de la date doit être JJ/MM/AAAA et être valide (JJ: 01-31, MM: 01-12)"
    )
    .required("La date est requis")
    .test(
      "is-valid-and-future-date",
      "La date doit être valide et non antérieure à la date du jour",
      function (value) {
        if (!value) return false;

        const elements = value.split("/");
        const day = Number(elements[0]);
        const month = Number(elements[1]) - 1; // Mois de 0 à 11 pour JavaScript
        const year = Number(elements[2]);

        const inputDate = new Date(year, month, day);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        return inputDate >= today;
      }
    ),

  priority: yup.string().oneOf(["Basse", "Moyenne", "Élevée"]),
  isCompleted: yup.boolean(),
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      date: "",
      priority: "Basse",
      isCompleted: false,
    }
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
              {...register("name")}
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
              type="text"
              placeholder="25/06/2025"
              {...register("date")}
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
            <Form.Select aria-label="select_priority" {...register("priority")}>
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Élevée">Élevée</option>
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
