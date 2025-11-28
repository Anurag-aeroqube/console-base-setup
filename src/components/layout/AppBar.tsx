import Header from '@/components/layout/header';
import { useRBAC } from '@/contexts/RBACContext';

export default function AppBar() {
  const { user } = useRBAC();
  
  return (
    <div className="sticky top-0 z-10 bg-background border-b">
      <Header user={user || undefined} />
    </div>
  );
}

