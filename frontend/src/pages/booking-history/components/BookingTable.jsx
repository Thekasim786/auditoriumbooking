import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const BookingTable = ({ bookings, onViewDetails }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: 'eventDate', direction: 'desc' });

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

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ChevronsUpDown';
    return sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown';
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('requestId')}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Request ID
                  <Icon name={getSortIcon('requestId')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('eventDate')}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Event Date
                  <Icon name={getSortIcon('eventDate')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submission Date
                  <Icon name={getSortIcon('submissionDate')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground">Event Purpose</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground">Auditorium</span>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground">Time Slot</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Status
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-xs font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings?.map((booking) => (
              <tr
                key={booking?.requestId}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {booking?.requestId}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground whitespace-nowrap">
                    {formatDate(booking?.eventDate)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(booking?.submissionDate)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="max-w-xs">
                    <p className="text-sm text-foreground line-clamp-2">
                      {booking?.eventPurpose}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground whitespace-nowrap">
                    {booking?.auditorium}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {formatTime(booking?.startTime)} - {formatTime(booking?.endTime)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={booking?.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(booking?.requestId)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;