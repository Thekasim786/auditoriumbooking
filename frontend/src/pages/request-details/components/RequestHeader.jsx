import React from 'react';
import Icon from '../../../components/AppIcon';

const RequestHeader = ({ request, onBack }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning border-warning/20',
      approved: 'bg-success/10 text-success border-success/20',
      rejected: 'bg-destructive/10 text-destructive border-destructive/20',
      'under-review': 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      'under-review': 'Under Review'
    };
    return labels?.[status] || status;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        <div className="flex items-start gap-3 md:gap-4">
          <button
            onClick={onBack}
            className="mt-1 p-2 hover:bg-muted rounded-lg transition-colors duration-250 focus-ring"
            aria-label="Go back"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
                Request #{request?.id}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(request?.status)}`}>
                {getStatusLabel(request?.status)}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} className="flex-shrink-0" />
                <span>Submitted: {request?.submittedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="flex-shrink-0" />
                <span>{request?.submittedTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-250 focus-ring"
            aria-label="Print request"
          >
            <Icon name="Printer" size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-250 focus-ring"
            aria-label="Share request"
          >
            <Icon name="Share2" size={18} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestHeader;