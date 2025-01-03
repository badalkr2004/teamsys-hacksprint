import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div>
      <Navbar />
      Home <Button variant={'destructive'}>Button</Button>
    </div>
  );
};

export default Home;
