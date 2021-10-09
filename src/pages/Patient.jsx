import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
export default (props) => {
  return (
    <PageHeaderWrapper>
      {
        props.children
      }
    </PageHeaderWrapper>
  )
};
