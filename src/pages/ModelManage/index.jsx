import React from 'react';
import { Select, Button, Divider, Modal, Form, InputNumber, Space } from 'antd';
import { FundViewOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
const DEFAULT_MODELS = [
  {
    key: '1',
    modelName: 'PC-Net',
    lastTrainTime: '2021-07-11 10:00',
    performance: {
      specificity: '0.902',
      sensitive: '0.812',
      AUC: '0.920',
    },
    desc: '针对DWI单模态影像，模型性能不如其它三个',
    params: {
      learningRate: '0.02',
      batchSize: '1000',
      optimizer: 'SGD',
      epoch: '100',
      activateFunction: 'relu',
    },
  },
  {
    key: '2',
    modelName: 'MMI-Net',
    lastTrainTime: '2021-10-20 06:15',
    performance: {
      specificity: '0.902',
      sensitive: '0.812',
      AUC: '0.920',
    },
    desc: '针对CT灌注多模态影像，模型性能较PC-Net有所提升',
    params: {
      learningRate: '',
      batchSize: '',
      optimizer: '',
      epoch: '',
      activateFunction: '',
    },
  },
  {
    key: '3',
    modelName: 'MMC-Net',
    lastTrainTime: '2020-11-05 10:23',
    performance: {
      specificity: '0.902',
      sensitive: '0.812',
      AUC: '0.920',
    },
    desc: '针对CT灌注多模态影像，模型想能和MMI-Net接近',
    params: {
      learningRate: '',
      batchSize: '',
      optimizer: '',
      epoch: '',
      activateFunction: '',
    },
  },
  {
    key: '4',
    modelName: 'MSM-Net',
    lastTrainTime: '2020-09-10 19:47',
    performance: {
      specificity: '0.902',
      sensitive: '0.812',
      AUC: '0.920',
    },
    desc: '联合DWI和CT灌注多站点影像，模型性能最好',
    params: {
      learningRate: '',
      batchSize: '',
      optimizer: '',
      epoch: '',
      activateFunction: '',
    },
  },
];

export default class ModelManager extends React.Component {
  state = {
    modelTable: DEFAULT_MODELS,
    modalVisible: false,
    selectedItem: {},
  };

  columns = [
    {
      title: '神经网络名称',
      dataIndex: 'modelName',
      key: 'modelName',
      render: (text, record) => (
        <Space onClick={() => this.openModal(record)}>
          <div className="mr-2">{text}</div>
          <FundViewOutlined style={{ color: 'green', fontSize: '1.5rem' }} />
        </Space>
      ),
    },
    {
      title: '模型性能',
      dataIndex: 'performance',
      key: 'performance',
      width: 360,
      render: (text) => (
        <>
          <span>特异度：{text.specificity} </span>
          <Divider type="vertical" />
          <span>灵敏度：{text.sensitive} </span>
          <Divider type="vertical" />
          <span>AUC：{text.AUC}</span>
        </>
      ),
    },
    {
      title: '模型说明',
      dataIndex: 'desc',
      key: 'desc',
      width: 400,
    },
    {
      title: '上次训练时间',
      dataIndex: 'lastTrainTime',
      key: 'lastTrainTime',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="mr-3" onClick={() => this.openModal(record)}>
          模型训练
        </Button>
      ),
    },
  ];
  openModal = (record) => {
    this.setState({
      selectedItem: record,
      modalVisible: true,
    });
  };

  setParams = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  deleteModel = (index) => {
    let { modelTable } = this.state;
    modelTable.splice(index, 1);
    this.setState({
      modelTable,
    });
  };

  render() {
    const { modelTable, modalVisible, selectedItem } = this.state;
    return (
      <PageContainer>
        <ProTable
          scroll={{ x: 1200 }}
          columns={this.columns}
          dataSource={modelTable}
          pagination={{
            pageSize: 5,
          }}
          search={false}
          options={{
            show: true,
            density: false,
            fullScreen: true,
            setting: true,
          }}
        />
        <Modal
          title="设置训练参数"
          visible={modalVisible}
          onOk={this.setParams}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
          destroyOnClose
        >
          <Form
            initialValues={selectedItem.params}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 6 }}
            layout="horizontal"
            preserve={false}
          >
            <Form.Item label="学习率" name="learningRate">
              <InputNumber />
            </Form.Item>
            <Form.Item label="batch_size" name="batchSize">
              <InputNumber />
            </Form.Item>
            <Form.Item label="优化器" name="optimizer">
              <Select>
                <Select.Option value="sgd">SGD</Select.Option>
                <Select.Option value="momentum">Momentum</Select.Option>
                <Select.Option value="Adam">Adam</Select.Option>
                <Select.Option value="RMSProp">RMSProp</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="迭代次数" name="epoch">
              <InputNumber />
            </Form.Item>
            <Form.Item label="激活函数" name="activateFunction">
              <Select>
                <Select.Option value="softmax">Softmax</Select.Option>
                <Select.Option value="relu">Relu</Select.Option>
                <Select.Option value="sigmoid">Sigmoid</Select.Option>
                <Select.Option value="tanh">Tanh</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </PageContainer>
    );
  }
}
