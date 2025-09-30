import { Layout } from 'antd';
const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      IeltsWeb ©{new Date().getFullYear()} Created by Hao Tran
    </Footer>
  );
};

export default AppFooter;
