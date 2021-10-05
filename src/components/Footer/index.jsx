import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '浙江大学',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      links={[]}
      copyright={`${currentYear} ${defaultMessage}`}
    />
  );
};
