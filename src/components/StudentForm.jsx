import React, { useEffect, useState } from "react";
import { Form, Button, Card, ListGroup, Col, Row } from "react-bootstrap";
import { useStudents } from "../Context/StudentContext";

const StudentForm = () => {
  const {
    addSubject,
    subjects,
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
    const newSub = {
      name: subjectInput,
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
    e.preventDefault();

    if (!formData.name || !formData.roll || formData.subjects.length === 0) {
      alert("Please fill all fields and add at least one subject");
      return;
    }

    const total = formData.subjects.reduce((sum, sub) => sum + sub.marks, 0);
    const percentage = (total / (formData.subjects.length * 100)) * 100;

    // Grade logic
    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else grade = "D";

    // Pass/Fail logic: any subject < 33 = Fail
    const isFail = formData.subjects.some((sub) => sub.marks < 33);
    const status = isFail ? "Fail" : "Pass";

    // Final object
    const finalData = {
      ...formData,
      total,
      percentage: percentage.toFixed(2),
      grade,
      status,
    };

    if (editStudentData) {
      updateStudent(finalData);
      setEditStudentData(null);
    } else {
      addStudent(finalData);
    }

    setFormData({ name: "", roll: "", subjects: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
