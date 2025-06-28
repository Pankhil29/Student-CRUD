import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

function Home() {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <StudentForm />
          {/* <SubjectForm /> */}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <StudentTable />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
