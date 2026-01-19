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
  const eventTypeOptions = [
    { value: 'seminar', label: 'Seminar' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'cultural', label: 'Cultural Event' },
    { value: 'academic', label: 'Academic Event' },
    { value: 'guest_lecture', label: 'Guest Lecture' },
    { value: 'other', label: 'Other' }
  ];

  const timeSlotOptions = [
    { value: '09:00-11:00', label: '09:00 AM - 11:00 AM' },
    { value: '11:00-13:00', label: '11:00 AM - 01:00 PM' },
    { value: '13:00-15:00', label: '01:00 PM - 03:00 PM' },
    { value: '15:00-17:00', label: '03:00 PM - 05:00 PM' },
    { value: '17:00-19:00', label: '05:00 PM - 07:00 PM' }
  ];

  const durationOptions = [
    { value: '1', label: '1 Hour' },
    { value: '2', label: '2 Hours' },
    { value: '3', label: '3 Hours' },
    { value: '4', label: '4 Hours' },
    { value: '5', label: '5 Hours' },
    { value: 'full_day', label: 'Full Day' }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Event Date"
            type="date"
            name="eventDate"
            value={formData?.eventDate}
            onChange={onInputChange}
            error={errors?.eventDate}
            required
            min={getMinDate()}
          />

          <Select
            label="Time Slot"
            name="timeSlot"
            options={timeSlotOptions}
            value={formData?.timeSlot}
            onChange={(value) => onInputChange({ target: { name: 'timeSlot', value } })}
            error={errors?.timeSlot}
            required
            placeholder="Select time slot"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Select
            label="Duration"
            name="duration"
            options={durationOptions}
            value={formData?.duration}
            onChange={(value) => onInputChange({ target: { name: 'duration', value } })}
            error={errors?.duration}
            required
            placeholder="Select duration"
          />

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
                        {booking?.eventTitle} - {booking?.timeSlot}
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