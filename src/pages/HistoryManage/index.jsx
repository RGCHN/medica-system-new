import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';
import HistoryList from '@/pages/HistoryManage/components/HistoryList';
import RoiTrend from '@/pages/HistoryManage/components/RoiTrend';

const { TabPane } = ProCard;

const HistoryManage = () => {
  const [tab, setTab] = useState('history');

  return (
    <ProCard
      tabs={{
        activeKey: tab,
        onChange: (key) => {
          setTab(key);
        },
      }}
    >
      <TabPane key="history" tab="历史预测记录">
        <HistoryList />
      </TabPane>
      <TabPane key="trend" tab="梗死区变化趋势">
        <RoiTrend />
      </TabPane>
    </ProCard>
  );
};

export default HistoryManage;
