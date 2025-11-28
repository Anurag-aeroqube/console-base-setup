import { ActionDefinition } from '@/types/data-management';
import { Button } from '@/components/ui/button';

interface ActionBarProps {
  actions: ActionDefinition[];
  onClick?: (actionKey: string) => void;
}

export default function ActionBar({ actions, onClick }: ActionBarProps) {
  return (
    <div className="flex items-center gap-2">
      {actions.map((action) => (
        <Button
          key={action.key}
          variant={action.variant || 'default'}
          size="sm"
          onClick={() => onClick?.(action.key)}
        >
          {action.icon}
          {action.label}
        </Button>
      ))}
    </div>
  );
}

