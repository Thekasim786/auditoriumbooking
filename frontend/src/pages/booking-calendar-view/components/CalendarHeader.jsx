import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onNavigate,
  onTodayClick 
}) => {
  const formatHeaderDate = () => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    };
    return currentDate?.toLocaleDateString('en-IN', options);
  };

  const viewModes = [
    { value: 'day', label: 'Day', icon: 'Calendar' },
    { value: 'week', label: 'Week', icon: 'CalendarDays' },
    { value: 'month', label: 'Month', icon: 'CalendarRange' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('prev')}
            iconName="ChevronLeft"
            aria-label="Previous period"
          />
          
          <div className="flex-1 lg:flex-none">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              {formatHeaderDate()}
            </h2>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate('next')}
            iconName="ChevronRight"
            aria-label="Next period"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onTodayClick}
            iconName="CalendarCheck"
            iconPosition="left"
          >
            Today
          </Button>

          <div className="flex bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.value}
                onClick={() => onViewModeChange(mode?.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-250 ${
                  viewMode === mode?.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-pressed={viewMode === mode?.value}
              >
                <Icon name={mode?.icon} size={16} />
                <span className="hidden sm:inline">{mode?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;