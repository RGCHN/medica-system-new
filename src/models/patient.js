import { useRef } from 'react';

export default () => {
  const patientID = useRef(undefined);
  const setPatientID = (id) => {
    patientID.current = id;
  };
  const getPatientID = () => patientID.current;

  return { setPatientID, getPatientID };
};
