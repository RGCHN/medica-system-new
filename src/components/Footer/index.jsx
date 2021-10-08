import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {

  return (
    <DefaultFooter
      links={[
        {
          key: 'ZJU',
          title: '浙江大学',
          href: 'https://www.zju.edu.cn/',
          blankTarget: true
        }
      ]}
      copyright={`2004-2020 浙江大学`}
    />
  );
};
