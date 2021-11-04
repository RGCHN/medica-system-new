import React, { useCallback } from 'react';
import { history, useModel } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
export default (props) => {
  const { setPatientID, setCurrentPatient } = useModel('patient');

  const backToList = useCallback(() => {
    setPatientID(undefined);
    setCurrentPatient(undefined);
    history.push('/list');
  }, []);

  return (
    <PageHeaderWrapper fixedHeader={true} onBack={backToList} title="AI辅助预测">
      {props.children}
    </PageHeaderWrapper>
  );
};
