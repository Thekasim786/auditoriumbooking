import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = ({ onAction }) => {
  const actions = [
    {
      id: 'view-calendar',
      label: 'View Full Calendar',
      description: 'See all bookings in calendar view',
      icon: 'Calendar',
      variant: 'default',
      color: 'var(--color-primary)'
    },
    {
      id: 'export-report',
      label: 'Export Report',
      description: 'Download booking analytics',
      icon: 'Download',
      variant: 'outline',
      color: 'var(--color-secondary)'
    },
    {
      id: 'send-notification',
      label: 'Send Notification',
      description: 'Notify faculty members',
      icon: 'Bell',
      variant: 'outline',
      color: 'var(--color-accent)'
    },
    {
      id: 'view-analytics',
      label: 'View Analytics',
      description: 'Detailed usage statistics',
      icon: 'BarChart3',
      variant: 'outline',
      color: 'var(--color-success)'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 border-b border-border px-4 md:px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-xs text-muted-foreground mt-1">Frequently used management tools</p>
      </div>
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {actions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => onAction(action?.id)}
              className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-all duration-250 hover-lift text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-250">
                <Icon name={action?.icon} size={20} color={action?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">{action?.label}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0 mt-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;