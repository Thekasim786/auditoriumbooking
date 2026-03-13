import React from 'react';
import Icon from '../../../components/AppIcon';

const RequestTimeline = ({ timeline }) => {
  const getStatusIcon = (status) => {
    const icons = {
      submitted: 'Send',
      'under-review': 'Eye',
      approved: 'CheckCircle',
      rejected: 'XCircle',
      modified: 'Edit',
      cancelled: 'Ban'
    };
    return icons?.[status] || 'Circle';
  };

  const getStatusColor = (status) => {
    const colors = {
      submitted: 'text-secondary',
      'under-review': 'text-warning',
      approved: 'text-success',
      rejected: 'text-destructive',
      modified: 'text-accent',
      cancelled: 'text-muted-foreground'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Request Timeline
      </h2>
      <div className="space-y-4 md:space-y-6">
        {timeline?.map((event, index) => (
          <div key={index} className="flex gap-3 md:gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`p-2 bg-card border-2 rounded-full ${getStatusColor(event?.status)}`}>
                <Icon name={getStatusIcon(event?.status)} size={20} />
              </div>
              {index < timeline?.length - 1 && (
                <div className="w-0.5 h-full bg-border mt-2" />
              )}
            </div>

            <div className="flex-1 pb-6 md:pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {event?.title}
                </h3>
                <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                  {event?.timestamp}
                </span>
              </div>

              <p className="text-sm md:text-base text-muted-foreground mb-2">
                {event?.description}
              </p>

              {event?.performedBy && (
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <Icon name="User" size={14} />
                  <span>{event?.performedBy}</span>
                </div>
              )}

              {event?.notes && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-xs md:text-sm text-foreground">
                    <span className="font-medium">Note: </span>
                    {event?.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestTimeline;