import { useState, useEffect } from 'react';

export interface StudentIDData {
  section: string;
  rollNumber: string;
  admissionYear: string;
  validUntil: string;
  bloodGroup: string;
  emergencyContact: string;
  hostelBlock: string;
  roomNumber: string;
  libraryId: string;
}

const defaultStudentIDData: StudentIDData = {
  section: "",
  rollNumber: "",
  admissionYear: "",
  validUntil: "",
  bloodGroup: "",
  emergencyContact: "",
  hostelBlock: "",
  roomNumber: "",
  libraryId: ""
};

export const useStudentIDData = () => {
  const [studentIDData, setStudentIDData] = useState<StudentIDData>(defaultStudentIDData);

  useEffect(() => {
    const savedData = localStorage.getItem('campussync-student-id-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setStudentIDData({ ...defaultStudentIDData, ...parsedData });
      } catch (error) {
        console.error('Error parsing saved student ID data:', error);
      }
    }
  }, []);

  const updateStudentIDData = (newData: Partial<StudentIDData>) => {
    const updatedData = { ...studentIDData, ...newData };
    setStudentIDData(updatedData);
    localStorage.setItem('campussync-student-id-data', JSON.stringify(updatedData));
  };

  return {
    studentIDData,
    updateStudentIDData
  };
};