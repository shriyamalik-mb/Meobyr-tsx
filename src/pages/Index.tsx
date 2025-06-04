
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
