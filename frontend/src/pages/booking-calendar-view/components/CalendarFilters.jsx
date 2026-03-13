import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CalendarFilters = ({ 
  selectedAuditorium, 
  onAuditoriumChange,
  selectedStatus,
  onStatusChange,
  onRefresh 
}) => {
  const auditoriumOptions = [
    { value: 'all', label: 'All Auditoriums' },
    { value: 'main-hall', label: 'Main Auditorium (500 Seats)' },
    { value: 'seminar-hall', label: 'Seminar Hall (120 Seats)' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Select Auditorium"
            options={auditoriumOptions}
            value={selectedAuditorium}
            onChange={onAuditoriumChange}
            searchable
          />

          <Select
            label="Booking Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={onStatusChange}
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onRefresh}
            iconName="RefreshCw"
            iconPosition="left"
            className="w-full lg:w-auto"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs font-medium text-green-700 dark:text-green-300">Confirmed</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Pending</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs font-medium text-red-700 dark:text-red-300">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarFilters;