import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusCard = ({ booking, onViewDetails, onCancel, onModify }) => {
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        label: 'Pending',
        bgColor: 'bg-warning/10',
        textColor: 'text-warning',
        borderColor: 'border-warning/20',
        icon: 'Clock'
      },
      approved: {
        label: 'Approved',
        bgColor: 'bg-success/10',
        textColor: 'text-success',
        borderColor: 'border-success/20',
        icon: 'CheckCircle'
      },
      rejected: {
        label: 'Rejected',
        bgColor: 'bg-destructive/10',
        textColor: 'text-destructive',
        borderColor: 'border-destructive/20',
        icon: 'XCircle'
      }
    };
    return configs?.[status] || configs?.pending;
  };

  const statusConfig = getStatusConfig(booking?.status);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date?.getDate())?.padStart(2, '0');
    const month = String(date?.getMonth() + 1)?.padStart(2, '0');
    const year = date?.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-250 overflow-hidden">
      <div className={`h-1 ${statusConfig?.bgColor?.replace('/10', '')}`} />
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 line-clamp-2">
              {booking?.eventTitle}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Request ID: {booking?.requestId}
            </p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig?.bgColor} border ${statusConfig?.borderColor}`}>
            <Icon name={statusConfig?.icon} size={14} className={statusConfig?.textColor} />
            <span className={`text-xs font-medium ${statusConfig?.textColor} whitespace-nowrap`}>
              {statusConfig?.label}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm">
            <Icon name="Calendar" size={16} className="text-muted-foreground flex-shrink-0" />
            <span className="text-foreground">
              <span className="font-medium">Event Date:</span> {formatDate(booking?.eventDate)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Icon name="Clock" size={16} className="text-muted-foreground flex-shrink-0" />
            <span className="text-foreground">
              <span className="font-medium">Time:</span> {booking?.timeSlot}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Icon name="Send" size={16} className="text-muted-foreground flex-shrink-0" />
            <span className="text-foreground">
              <span className="font-medium">Submitted:</span> {formatDate(booking?.submittedDate)}
            </span>
          </div>

          {booking?.auditoriumName && (
            <div className="flex items-center gap-3 text-sm">
              <Icon name="Building2" size={16} className="text-primary flex-shrink-0" />
              <span className="text-foreground">
                <span className="font-medium">Auditorium:</span> {booking?.auditoriumName}
              </span>
            </div>
          )}

          {booking?.managerNote && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Manager's Note:</p>
              <p className="text-sm text-foreground">{booking?.managerNote}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(booking)}
            fullWidth
            className="sm:flex-1"
          >
            View Details
          </Button>
          
          {booking?.status === 'pending' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={() => onModify(booking)}
                className="sm:w-auto"
              >
                Modify
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={() => onCancel(booking)}
                className="sm:w-auto"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;