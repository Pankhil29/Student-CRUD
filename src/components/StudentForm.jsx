import React, { useEffect, useState } from "react";
import { Form, Button, Card, ListGroup, Col, Row } from "react-bootstrap";
import { useStudents } from "../Context/StudentContext";

const StudentForm = () => {
  const {
    // addSubject,
    // subjects,
    addStudent,
    updateStudent,
    editStudentData,
    setEditStudentData,
  } = useStudents();
  const [subjectInput, setSubjectInput] = useState("");
  const [marksInput, setMarksInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    std: "",
    subjects: [],
  });

  useEffect(() => {
    if (editStudentData) {
      setFormData(editStudentData);
    }
  }, [editStudentData]);

  const handleAddSubject = () => {
    if (!subjectInput || !marksInput) {
      alert("Enter both subject and marks");
      return;
    }

    // Check for duplicate subject in current formData
    const exists = formData.subjects.some(
      (s) => s.name.trim().toLowerCase() === subjectInput.trim().toLowerCase()
    );

    if (exists) {
      alert("This subject already added for this student");
      return;
    }

    const newSub = {
      name: subjectInput.trim(),
      marks: Number(marksInput),
    };

    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, newSub],
    }));

    setSubjectInput("");
    setMarksInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // page refresh na thva de.
    if (
      /[^A-Za-z ]+$/.test(formData.name) ||
      /[^A-Za-z ]+$/.test(formData.subject) ||
      /[^0-9 ]+$/.test(formData.std) ||
      /[^0-9 ]+$/.test(formData.roll)
    ) {
      alert("Please enter the valid data");
      return;
    }
    if (
      !formData.name ||
      !formData.roll ||
      formData.subjects.length === 0 ||
      !formData.std
    ) {
      alert("Please fill all fields and add at least one subject");
      return;
    }

    const total = formData.subjects.reduce((sum, sub) => sum + sub.marks, 0);
    const percentage = (total / (formData.subjects.length * 100)) * 100;

    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else grade = "D";

    const isFail = formData.subjects.some((sub) => sub.marks < 33); // if any subject has < 33 marks .
    const status = isFail ? "Fail" : "Pass";

    const finalData = {
      ...formData,
      total,
      percentage: percentage.toFixed(2), // two decimalpoint
      grade,
      status,
    };

    if (editStudentData) {
      updateStudent(finalData);
      setEditStudentData(null);
    } else {
      addStudent(finalData);
    }

    setFormData({ name: "", roll: "", std: "", subjects: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // destrucutring

    // if (/[^A-Za-z ]+$/.test(value)) {
    //   // console.log("name must be a string");

    //   // setFormData({ name: "", roll: "", std: "", subjects: [] });
    // } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // }
  };

  return (
    <Card className="p-4 my-3">
      <h4 className="text-center pb-3">
        {editStudentData ? "Edit Student" : "Add New Student"}
      </h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        {formData.name && !/^[A-Za-z ]+$/.test(formData.name) && (
          <small className="text-danger">Name must contain only letters</small>
        )}

        <Form.Group>
          <Form.Label>Standard</Form.Label>
          <Form.Control
            type="text"
            name="std"
            placeholder="Enter standard"
            value={formData.std} //controlled component it changes the state
            onChange={handleChange}
          />
        </Form.Group>
        {formData.std && /[^0-9 ]+$/.test(formData.std) && (
          <small className="text-danger">
            Standard must contain only numbers
          </small>
        )}
        <Form.Group className="mb-2">
          <Form.Label>Roll No</Form.Label>
          <Form.Control
            type="text"
            name="roll"
            placeholder="Enter roll no"
            value={formData.roll}
            onChange={handleChange}
          />
        </Form.Group>
        {formData.roll && /[^0-9 ]+$/.test(formData.roll) && (
          <small className="text-danger">
            Standard must contain only numbers
          </small>
        )}
        <Row className="align-items-end">
          <Col>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Math"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Marks</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 85"
              value={marksInput}
              onChange={(e) => setMarksInput(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="info" onClick={handleAddSubject}>
              Add Subject
            </Button>
          </Col>
        </Row>
        {subjectInput && !/^[A-Za-z ]+$/.test(subjectInput) && (
          <small className="text-danger">Name must contain only letters</small>
        )}
        <ul className="mt-3">
          {formData.subjects.map((sub, idx) => (
            <li key={idx}>
              {sub.name} - {sub.marks} marks
            </li>
          ))}
        </ul>

        <Button type="submit" variant="success" className="mt-3">
          {editStudentData ? "Update Student" : "Add Student"}
        </Button>
      </Form>
    </Card>
  );
};

export default StudentForm;
