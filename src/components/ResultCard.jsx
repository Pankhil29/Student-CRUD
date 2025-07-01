import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ResultCard = ({ show, handleClose, student }) => {
  if (!student) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Result Card - {student.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center">Flower Public School</h4>
        <hr />
        <p className="d-flex justify-content-between">
          <strong>Student Name: {student.name}</strong>
          <strong>Standard: {student.std}</strong>
        </p>
        <p>
          <strong>Roll No:</strong> {student.roll}
        </p>

        <Table bordered>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {student.subjects.map((sub, idx) => (
              <tr key={idx}>
                <td>{sub.name}</td>
                <td>{sub.marks}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{student.total}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Percentage</strong>
              </td>
              <td>
                <strong>{student.percentage}%</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Grade</strong>
              </td>
              <td>
                <strong>{student.grade}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Status</strong>
              </td>
              <td>
                <strong
                  className={
                    student.status === "Pass" ? "text-success" : "text-danger"
                  }
                >
                  {student.status}
                </strong>
              </td>
            </tr>
          </tbody>
        </Table>

        <div className="text-end mt-4">
          <p>Principal Signature: ___________________</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultCard;
