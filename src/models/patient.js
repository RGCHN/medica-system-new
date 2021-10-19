import { useState } from 'react';

export default () => {
  const [currentPatient, setCurrentPatient] = useState(undefined);
  return { currentPatient, setCurrentPatient };
};
