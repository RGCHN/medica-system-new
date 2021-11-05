import React, { useCallback, useEffect } from 'react';
import { history, useModel } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (props) => {
  const { setPatientID, setCurrentPatient, getPatientData, getPatientID } = useModel('patient');
  const currentPatient = getPatientData();
  const patientID = getPatientID();

  const backToList = useCallback(() => {
    setPatientID(undefined);
    setCurrentPatient(undefined);
    history.push('/list');
  }, []);

  useEffect(() => {
    if (!patientID) {
      history.push('/list');
    }
  }, []);

  return (
    <PageHeaderWrapper fixedHeader={true} onBack={backToList} title="AI辅助预测">
      {props.children}
    </PageHeaderWrapper>
  );
};
