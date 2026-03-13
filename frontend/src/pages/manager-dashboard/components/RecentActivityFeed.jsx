import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      approved: 'CheckCircle',
      rejected: 'XCircle',
      submitted: 'FileText',
      modified: 'Edit',
      cancelled: 'Trash2'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      approved: 'text-success bg-success/10',
      rejected: 'text-error bg-error/10',
      submitted: 'text-primary bg-primary/10',
      modified: 'text-warning bg-warning/10',
      cancelled: 'text-muted-foreground bg-muted'
    };
    return colors?.[type] || 'text-foreground bg-muted';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 border-b border-border px-4 md:px-6 py-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-xs text-muted-foreground mt-1">Latest booking updates</p>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Icon name="Activity" size={32} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="text-base font-semibold text-foreground mb-2">No Recent Activity</h4>
            <p className="text-sm text-muted-foreground">Activity will appear here as actions are taken</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity?.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground mb-1">
                    <span className="font-medium">{activity?.performedBy}</span>
                    {' '}
                    <span className="text-muted-foreground">{activity?.action}</span>
                    {' '}
                    <span className="font-medium">{activity?.target}</span>
                  </p>
                  
                  {activity?.details && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {activity?.details}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                    {activity?.eventDate && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={12} />
                          {activity?.eventDate}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivityFeed;