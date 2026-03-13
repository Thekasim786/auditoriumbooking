import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const EventDetailsSection = ({
  formData,
  errors,
  onInputChange,
  availabilityStatus,
  conflictingBookings
}) => {
  const venueOptions = [
    { value: 'main_auditorium', label: 'Main Auditorium (500 capacity)' },
    { value: 'seminar_hall', label: 'Seminar Hall (120 capacity)' },
  ];

  const eventTypeOptions = [
    { value: 'seminar', label: 'Seminar' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'cultural', label: 'Cultural Event' },
    { value: 'academic', label: 'Academic Event' },
    { value: 'guest_lecture', label: 'Guest Lecture' },
    { value: 'other', label: 'Other' }
  ];

  const calculateDuration = () => {
    if (formData?.startTime && formData?.endTime) {
      const start = new Date(`2000-01-01T${formData.startTime}:00`);
      const end = new Date(`2000-01-01T${formData.endTime}:00`);
      
      if (end > start) {
        const diffMs = end - start;
        const diffHours = diffMs / (1000 * 60 * 60);
        const hours = Math.floor(diffHours);
        const minutes = Math.round((diffHours - hours) * 60);
        
        if (minutes === 0) {
          return `${hours} Hour${hours !== 1 ? 's' : ''}`;
        } else {
          return `${hours}h ${minutes}m`;
        }
      }
    }
    return '';
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today?.getFullYear();
    const month = String(today?.getMonth() + 1)?.padStart(2, '0');
    const day = String(today?.getDate())?.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-elevation-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Event Details</h2>
          <p className="text-sm text-muted-foreground">Fill in the event information</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Select
            label="Venue"
            name="venue"
            options={venueOptions}
            value={formData?.venue}
            onChange={(value) => onInputChange({ target: { name: 'venue', value } })}
            error={errors?.venue}
            required
            placeholder="Select venue"
          />

          <Select
            label="Event Type"
            name="eventType"
            options={eventTypeOptions}
            value={formData?.eventType}
            onChange={(value) => onInputChange({ target: { name: 'eventType', value } })}
            error={errors?.eventType}
            required
            placeholder="Select event type"
          />
        </div>

        <div>
          <Input
            label="Event Title"
            type="text"
            name="eventTitle"
            placeholder="Enter event title"
            value={formData?.eventTitle}
            onChange={onInputChange}
            error={errors?.eventTitle}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Event Start Date"
            type="date"
            name="eventStartDate"
            value={formData?.eventStartDate}
            onChange={onInputChange}
            error={errors?.eventStartDate}
            required
            min={getMinDate()}
          />

          <Input
            label="Event End Date"
            type="date"
            name="eventEndDate"
            value={formData?.eventEndDate}
            onChange={onInputChange}
            error={errors?.eventEndDate}
            required
            min={formData?.eventStartDate || getMinDate()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Input
            label="Start Time"
            type="time"
            name="startTime"
            value={formData?.startTime}
            onChange={onInputChange}
            error={errors?.startTime}
            required
          />

          <Input
            label="Expected End Time"
            type="time"
            name="endTime"
            value={formData?.endTime}
            onChange={onInputChange}
            error={errors?.endTime}
            required
          />

          <Input
            label="Duration"
            type="text"
            name="duration"
            value={calculateDuration()}
            readOnly
            placeholder="Auto-calculated"
            className="bg-muted"
          />
        </div>

        <div>
          <Input
            label="Expected Attendees"
            type="number"
            name="expectedAttendees"
            placeholder="Enter number"
            value={formData?.expectedAttendees}
            onChange={onInputChange}
            error={errors?.expectedAttendees}
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Event Purpose <span className="text-destructive">*</span>
          </label>
          <textarea
            name="eventPurpose"
            value={formData?.eventPurpose}
            onChange={onInputChange}
            placeholder="Describe the purpose and details of your event..."
            rows="4"
            maxLength="500"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors?.eventPurpose ? 'border-destructive' : 'border-input'
            } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250`}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {formData?.eventPurpose?.length}/500 characters
            </p>
          </div>
          {errors?.eventPurpose && (
            <p className="text-sm text-destructive mt-1">{errors?.eventPurpose}</p>
          )}
        </div>

        {availabilityStatus && (
          <div
            className={`p-4 rounded-lg border ${
              availabilityStatus?.available
                ? 'bg-success/10 border-success/30' :'bg-warning/10 border-warning/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <Icon
                name={availabilityStatus?.available ? 'CheckCircle2' : 'AlertTriangle'}
                size={20}
                color={availabilityStatus?.available ? 'var(--color-success)' : 'var(--color-warning)'}
              />
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    availabilityStatus?.available ? 'text-success' : 'text-warning'
                  }`}
                >
                  {availabilityStatus?.message}
                </p>
                {!availabilityStatus?.available && conflictingBookings?.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground">Conflicting bookings:</p>
                    {conflictingBookings?.map((booking, index) => (
                      <div key={index} className="text-xs text-foreground bg-background/50 p-2 rounded">
                        {booking?.eventTitle} - {booking?.startTime} to {booking?.endTime}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsSection;