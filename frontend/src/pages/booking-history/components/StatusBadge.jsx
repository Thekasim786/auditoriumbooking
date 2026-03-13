import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    approved: {
      bg: 'bg-success/10',
      text: 'text-success',
      label: 'Approved'
    },
    rejected: {
      bg: 'bg-destructive/10',
      text: 'text-destructive',
      label: 'Rejected'
    },
    pending: {
      bg: 'bg-warning/10',
      text: 'text-warning',
      label: 'Pending'
    },
    cancelled: {
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      label: 'Cancelled'
    },
    completed: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      label: 'Completed'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.pending;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
      {config?.label}
    </span>
  );
};

export default StatusBadge;