import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useStudents } from "../Context/StudentContext";
import ResultCard from "./ResultCard";

const StudentTable = () => {
  const { students, deleteStudent, setEditStudentData } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewResult = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };
  return (
    <div>
      <h4 className="text-center">Student List</h4>
      {students.length === 0 ? (
        <p className="text-center">No students added yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Standard</th>
              <th>Subject</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Result</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, index) => (
              <tr key={stu.id}>
                <td>{index + 1}</td>
                <td>{stu.name}</td>
                <td>{stu.roll}</td>
                <td>{stu.std}</td>
                <td>
                  <ul className="list-unstyled mb-0">
                    {stu.subjects.map((sub, idx) => (
                      <li key={idx}>
                        {sub.name}: {sub.marks} marks
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{stu.total}</td>
                <td>{stu.percentage}%</td>
                <td>{stu.grade}</td>
                <td>
                  <span
                    className={
                      stu.status === "Pass" ? "text-success" : "text-danger"
                    }
                  >
                    {stu.status}
                  </span>
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewResult(stu)}
                  >
                    View Result
                  </Button>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => setEditStudentData(stu)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteStudent(stu.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ResultCard
        show={showModal}
        handleClose={() => setShowModal(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default StudentTable;
