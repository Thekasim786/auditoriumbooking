import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RequestQueueTable = ({ requests, onApprove, onReject, onViewDetails, onBulkAction }) => {
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'submittedAt', direction: 'asc' });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRequests(requests?.map(req => req?.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId, checked) => {
    if (checked) {
      setSelectedRequests([...selectedRequests, requestId]);
    } else {
      setSelectedRequests(selectedRequests?.filter(id => id !== requestId));
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedRequests = [...requests]?.sort((a, b) => {
    if (sortConfig?.key === 'submittedAt') {
      return sortConfig?.direction === 'asc' 
        ? new Date(a.submittedAt) - new Date(b.submittedAt)
        : new Date(b.submittedAt) - new Date(a.submittedAt);
    }
    return 0;
  });

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-error bg-error/10',
      medium: 'text-warning bg-warning/10',
      low: 'text-success bg-success/10'
    };
    return colors?.[priority] || colors?.low;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = String(date?.getDate())?.padStart(2, '0');
    const month = String(date?.getMonth() + 1)?.padStart(2, '0');
    const year = date?.getFullYear();
    const hours = String(date?.getHours())?.padStart(2, '0');
    const minutes = String(date?.getMinutes())?.padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedRequests?.length > 0 && (
        <div className="bg-primary/5 border-b border-primary/20 px-4 md:px-6 py-3 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-foreground">
            {selectedRequests?.length} selected
          </span>
          <div className="flex gap-2">
            <Button 
              variant="success" 
              size="sm" 
              iconName="Check"
              onClick={() => onBulkAction('approve', selectedRequests)}
            >
              Approve All
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              iconName="X"
              onClick={() => onBulkAction('reject', selectedRequests)}
            >
              Reject All
            </Button>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox 
                  checked={selectedRequests?.length === requests?.length && requests?.length > 0}
                  indeterminate={selectedRequests?.length > 0 && selectedRequests?.length < requests?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button 
                  onClick={() => handleSort('submittedAt')}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submitted
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Faculty</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Event Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Duration</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Facilities</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Priority</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedRequests?.map((request) => (
              <tr key={request?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <Checkbox 
                    checked={selectedRequests?.includes(request?.id)}
                    onChange={(e) => handleSelectRequest(request?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground font-medium whitespace-nowrap">
                    {formatDateTime(request?.submittedAt)}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={16} color="var(--color-primary)" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{request?.facultyName}</p>
                      <p className="text-xs text-muted-foreground truncate">{request?.department}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground whitespace-nowrap">{request?.eventDate}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground whitespace-nowrap">{request?.duration}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {request?.facilities?.slice(0, 2)?.map((facility, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-foreground">
                        <Icon name={facility?.icon} size={12} />
                        {facility?.name}
                      </span>
                    ))}
                    {request?.facilities?.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                        +{request?.facilities?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request?.priority)}`}>
                    {request?.priority}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="Eye"
                      onClick={() => onViewDetails(request?.id)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="success" 
                      size="sm" 
                      iconName="Check"
                      onClick={() => onApprove(request?.id)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      iconName="X"
                      onClick={() => onReject(request?.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedRequests?.map((request) => (
          <div key={request?.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <Checkbox 
                checked={selectedRequests?.includes(request?.id)}
                onChange={(e) => handleSelectRequest(request?.id, e?.target?.checked)}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} color="var(--color-primary)" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{request?.facultyName}</p>
                    <p className="text-xs text-muted-foreground truncate">{request?.department}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span className="text-xs">{formatDateTime(request?.submittedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Icon name="Calendar" size={14} />
                    <span className="text-xs">{request?.eventDate} • {request?.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-2">
                  {request?.facilities?.map((facility, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-foreground">
                      <Icon name={facility?.icon} size={12} />
                      {facility?.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getPriorityColor(request?.priority)}`}>
                {request?.priority}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="Eye"
                fullWidth
                onClick={() => onViewDetails(request?.id)}
              >
                View
              </Button>
              <Button 
                variant="success" 
                size="sm" 
                iconName="Check"
                fullWidth
                onClick={() => onApprove(request?.id)}
              >
                Approve
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                iconName="X"
                fullWidth
                onClick={() => onReject(request?.id)}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
      {requests?.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Icon name="Inbox" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Pending Requests</h3>
          <p className="text-sm text-muted-foreground">All booking requests have been processed</p>
        </div>
      )}
    </div>
  );
};

export default RequestQueueTable;