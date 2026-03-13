import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const BookingCard = ({ booking, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 hover:shadow-elevation-2 transition-all duration-250">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-2 mb-1">
                {booking?.eventPurpose}
              </h3>
              <p className="text-sm text-muted-foreground">
                Request ID: {booking?.requestId}
              </p>
            </div>
          </div>
        </div>
        <StatusBadge status={booking?.status} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Event Date:</span>
          <span className="font-medium text-foreground">{formatDate(booking?.eventDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Time:</span>
          <span className="font-medium text-foreground">
            {formatTime(booking?.startTime)} - {formatTime(booking?.endTime)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Building2" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Auditorium:</span>
          <span className="font-medium text-foreground">{booking?.auditorium}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Send" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">Submitted:</span>
          <span className="font-medium text-foreground">{formatDate(booking?.submissionDate)}</span>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-border pt-4 mt-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Faculty Name</p>
              <p className="text-sm font-medium text-foreground">{booking?.facultyName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Department</p>
              <p className="text-sm font-medium text-foreground">{booking?.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Expected Attendees</p>
              <p className="text-sm font-medium text-foreground">{booking?.attendees}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="text-sm font-medium text-foreground">{booking?.duration}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Required Facilities</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {booking?.facilities?.map((facility, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-foreground"
                >
                  <Icon name="Check" size={12} />
                  {facility}
                </span>
              ))}
            </div>
          </div>
          {booking?.remarks && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Remarks</p>
              <p className="text-sm text-foreground">{booking?.remarks}</p>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="left"
          onClick={() => setIsExpanded(!isExpanded)}
          fullWidth
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(booking?.requestId)}
          fullWidth
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;