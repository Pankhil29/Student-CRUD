import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const useStudents = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState(["Math", "English", "Science"]);
  const [editStudentData, setEditStudentData] = useState(null);

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: Date.now() }]);
  };

  const addSubject = (subject) => {
    if (!subjects.includes(subject)) {
      setSubjects((prev) => [...prev, subject]);
    }
  };
  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
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
        subjects,
        addStudent,
        addSubject,
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
