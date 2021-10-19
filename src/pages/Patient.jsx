import React from 'react';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
export default (props) => {
  return (
    <PageHeaderWrapper
      fixedHeader={true}
      onBack={() => history.push('/list')} title='AI辅助预测'>
      {
        props.children
      }
    </PageHeaderWrapper>
  )
};
