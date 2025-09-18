import { useState, useEffect } from 'react';

export interface UserData {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  course: string;
  year: string;
  semester: string;
  cgpa: string;
  avatar: string;
  address: string;
  enrollmentDate: string;
  expectedGraduation: string;
  status: string;
}

const defaultUserData: UserData = {
  name: "",
  email: "",
  phone: "",
  studentId: "",
  course: "",
  year: "",
  semester: "",
  cgpa: "",
  avatar: "/placeholder.svg",
  address: "",
  enrollmentDate: "",
  expectedGraduation: "",
  status: ""
};

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  useEffect(() => {
    const savedData = localStorage.getItem('campussync-user-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setUserData({ ...defaultUserData, ...parsedData });
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }
  }, []);

  const updateUserData = (newData: Partial<UserData>) => {
    const updatedData = { ...userData, ...newData };
    setUserData(updatedData);
    localStorage.setItem('campussync-user-data', JSON.stringify(updatedData));
  };

  return {
    userData,
    updateUserData
  };
};