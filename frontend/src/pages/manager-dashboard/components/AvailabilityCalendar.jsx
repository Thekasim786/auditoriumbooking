import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const AvailabilityCalendar = ({ bookings, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 12));
  const [viewMode, setViewMode] = useState('month');

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days?.push(new Date(year, month, i));
    }
    return days;
  };

  const getBookingStatus = (date) => {
    if (!date) return null;
    const dateStr = `${String(date?.getDate())?.padStart(2, '0')}/${String(date?.getMonth() + 1)?.padStart(2, '0')}/${date?.getFullYear()}`;
    const dayBookings = bookings?.filter(b => b?.date === dateStr);
    
    if (dayBookings?.length === 0) return 'available';
    if (dayBookings?.length >= 3) return 'full';
    return 'partial';
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-success/10 text-success border-success/20',
      partial: 'bg-warning/10 text-warning border-warning/20',
      full: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || '';
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.getDate() === today?.getDate() &&
           date?.getMonth() === today?.getMonth() &&
           date?.getFullYear() === today?.getFullYear();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-muted/50 border-b border-border px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Auditorium Availability</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              iconName="ChevronLeft"
              onClick={handlePrevMonth}
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleToday}
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              iconName="ChevronRight"
              onClick={handleNextMonth}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span className="text-xs text-muted-foreground">Partially Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-xs text-muted-foreground">Fully Booked</span>
          </div>
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="p-4 md:p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
          {dayNames?.map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {days?.map((date, index) => {
            const status = getBookingStatus(date);
            const today = isToday(date);
            
            return (
              <button
                key={index}
                onClick={() => date && onDateSelect(date)}
                disabled={!date}
                className={`
                  aspect-square rounded-lg border transition-all duration-250
                  ${date ? 'hover:shadow-elevation-2 hover-lift cursor-pointer' : 'cursor-default'}
                  ${today ? 'ring-2 ring-primary' : ''}
                  ${status ? getStatusColor(status) : 'bg-transparent border-transparent'}
                  ${!date ? 'invisible' : ''}
                `}
              >
                {date && (
                  <div className="flex flex-col items-center justify-center h-full p-1">
                    <span className={`text-xs md:text-sm font-medium ${today ? 'font-bold' : ''}`}>
                      {date?.getDate()}
                    </span>
                    {status !== 'available' && (
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: status === 'full' ? 3 : 2 })?.map((_, i) => (
                          <div key={i} className="w-1 h-1 rounded-full bg-current"></div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Mobile Agenda View Toggle */}
      <div className="lg:hidden border-t border-border p-4">
        <Button 
          variant="outline" 
          fullWidth 
          iconName="List"
          onClick={() => setViewMode(viewMode === 'month' ? 'agenda' : 'month')}
        >
          Switch to {viewMode === 'month' ? 'Agenda' : 'Calendar'} View
        </Button>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;