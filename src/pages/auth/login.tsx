import LayoutMain from '@/components/container/LayoutMain';
import LoginForm from '@/components/form/LoginForm';
const IndexPage = () => {
  return (
    <LayoutMain id="main" className="pt-16">
      <LoginForm />
    </LayoutMain>
  );
};

export default IndexPage;
