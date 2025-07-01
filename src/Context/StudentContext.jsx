import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  // const [subjects, setSubjects] = useState([]);
  const [editStudentData, setEditStudentData] = useState(null);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: Date.now() }]); // for unique id
  };

  // const addSubject = (subject) => {
  //   const formatted = subject.trim().toLowerCase();
  //   const subjectExists = subjects.some(
  //     (s) => s.trim().toLowerCase() === formatted
  //   );

  //   if (!subjectExists) {
  //     setSubjects((prev) => [...prev, subject]);
  //   } else {
  //     alert("Subject already exists");
  //   }
  // };
  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id)); // je value true hoy aene j array ma store kare.
  };
  const updateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        // subjects,
        addStudent,
        // addSubject,
        deleteStudent,
        updateStudent,
        editStudentData,
        setEditStudentData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
