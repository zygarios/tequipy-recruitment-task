import express from "express";
import { EMPLOYEES } from "./employees.data.mjs";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

const employees = EMPLOYEES;

app.get("/employees", (_, res) => {
  res.json(employees);
});

app.get("/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send({ error: "Employee not found" });
  }
});

app.post("/users/:id/offboard", (req, res) => {
  const userId = req.params.id;
  const { address, notes, phone, email } = req.body;

  if (!address || !phone || !email) {
    return res.status(400).send({ error: "Invalid request payload" });
  }
  const employee = employees.find((employee) => employee.id === userId);
  if (!employee) {
    return res.status(404).send({ error: "Employee not found" });
  }
  employee.status = "OFFBOARDED";
  res.status(200).send({
    message: `User ${employee.name} has been offboarded`,
    data: { address, notes, phone, email },
  });
});

app.listen(3000, () => {
  console.log("Mockowy serwer działa na http://localhost:3000");
});
