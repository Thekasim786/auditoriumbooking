import React from 'react';


const MonthView = ({ bookings, currentDate, selectedBooking, onBookingSelect, onDateSelect }) => {
  const getMonthDays = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
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

  const monthDays = getMonthDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getBookingsForDay = (day) => {
    if (!day) return [];
    return bookings?.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate?.toDateString() === day?.toDateString();
    });
  };

  const getBookingCountByStatus = (dayBookings) => {
    return {
      confirmed: dayBookings?.filter(b => b?.status === 'confirmed')?.length,
      pending: dayBookings?.filter(b => b?.status === 'pending')?.length,
      cancelled: dayBookings?.filter(b => b?.status === 'cancelled')?.length
    };
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elevation-1">
      <div className="grid grid-cols-7 border-b border-border">
        {dayNames?.map((day) => (
          <div
            key={day}
            className="bg-muted p-3 md:p-4 text-center text-sm font-semibold text-foreground border-r border-border last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {monthDays?.map((day, index) => {
          const dayBookings = getBookingsForDay(day);
          const statusCounts = getBookingCountByStatus(dayBookings);
          const isToday = day && day?.toDateString() === new Date()?.toDateString();
          const isCurrentMonth = day && day?.getMonth() === currentDate?.getMonth();

          return (
            <div
              key={index}
              className={`min-h-[100px] md:min-h-[120px] p-2 border-r border-b border-border last:border-r-0 ${
                !isCurrentMonth ? 'bg-muted/30' : ''
              }`}
            >
              {day && (
                <button
                  onClick={() => onDateSelect(day)}
                  className="w-full h-full text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm md:text-base font-semibold ${
                        isToday
                          ? 'w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground'
                          : isCurrentMonth
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {day?.getDate()}
                    </span>
                    {dayBookings?.length > 0 && (
                      <span className="text-xs font-medium text-muted-foreground">
                        {dayBookings?.length}
                      </span>
                    )}
                  </div>

                  {dayBookings?.length > 0 && (
                    <div className="space-y-1">
                      {statusCounts?.confirmed > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-green-700 dark:text-green-300">
                            {statusCounts?.confirmed}
                          </span>
                        </div>
                      )}
                      {statusCounts?.pending > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <span className="text-yellow-700 dark:text-yellow-300">
                            {statusCounts?.pending}
                          </span>
                        </div>
                      )}
                      {statusCounts?.cancelled > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-red-700 dark:text-red-300">
                            {statusCounts?.cancelled}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;