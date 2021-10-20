import { useRef } from 'react';

export default () => {
  const patientID = useRef(undefined);
  const patientData = useRef({});

  const setPatientData = (data) => {
    patientData.current = data;
  };

  const getPatientData = () => patientData.current;

  const setPatientID = (id) => {
    patientID.current = id;
  };
  const getPatientID = () => patientID.current;

  return { setPatientID, getPatientID, getPatientData, setPatientData };
};
