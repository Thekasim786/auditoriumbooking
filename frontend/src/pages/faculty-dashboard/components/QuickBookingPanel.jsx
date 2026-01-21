import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuickBookingPanel = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [formData, setFormData] = useState({
    eventDate: '',
    timeSlot: '',
    eventPurpose: '',
    facilities: {
      projector: false,
      microphone: false,
      seating100: false,
      seating200: false,
      seating500: false
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlotOptions = [
    { value: '09:00-11:00', label: '09:00 AM - 11:00 AM (Morning)' },
    { value: '11:00-13:00', label: '11:00 AM - 01:00 PM (Noon)' },
    { value: '14:00-16:00', label: '02:00 PM - 04:00 PM (Afternoon)' },
    { value: '16:00-18:00', label: '04:00 PM - 06:00 PM (Evening)' },
    { value: '18:00-20:00', label: '06:00 PM - 08:00 PM (Evening)' }
  ];

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today?.setHours(0, 0, 0, 0);

    if (!formData?.eventDate) {
      newErrors.eventDate = 'Please select Event Date';
    } else {
      const selectedDate = new Date(formData.eventDate);
      if (selectedDate < today) {
        newErrors.eventDate = 'Cannot select past date';
      }
    }

    if (!formData?.timeSlot) {
      newErrors.timeSlot = 'Please select Time Slot';
    }

    if (!formData?.eventPurpose?.trim()) {
      newErrors.eventPurpose = 'Please provide Event Purpose';
    } else if (formData?.eventPurpose?.trim()?.length < 10) {
      newErrors.eventPurpose = 'Please write at least 10 characters';
    }

    const hasFacility = Object.values(formData?.facilities)?.some(val => val);
    if (!hasFacility) {
      newErrors.facilities = 'Please select at least one facility';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/booking-request-form', { 
          state: { 
            quickBookingData: formData,
            message: 'Request successfully submitted!'
          } 
        });
      }, 1500);
    }
  };

  const handleFacilityChange = (facilityName, checked) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev?.facilities,
        [facilityName]: checked
      }
    }));
    if (errors?.facilities) {
      setErrors(prev => ({ ...prev, facilities: undefined }));
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today?.getFullYear();
    const month = String(today?.getMonth() + 1)?.padStart(2, '0');
    const day = String(today?.getDate())?.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2">
      <div 
        className="flex items-center justify-between p-4 md:p-6 border-b border-border cursor-pointer lg:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="CalendarPlus" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">
              Quick Booking
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Book auditorium instantly
            </p>
          </div>
        </div>
        <button 
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-250"
          aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
        >
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            className="text-muted-foreground"
          />
        </button>
      </div>
      <div className={`${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              type="date"
              label="Event Date"
              description="Select date in DD/MM/YYYY format"
              required
              value={formData?.eventDate}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, eventDate: e?.target?.value }));
                if (errors?.eventDate) {
                  setErrors(prev => ({ ...prev, eventDate: undefined }));
                }
              }}
              error={errors?.eventDate}
              min={getTodayDate()}
              className="w-full"
            />

            <Select
              label="Time Slot"
              description="Choose your preferred time"
              required
              options={timeSlotOptions}
              value={formData?.timeSlot}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, timeSlot: value }));
                if (errors?.timeSlot) {
                  setErrors(prev => ({ ...prev, timeSlot: undefined }));
                }
              }}
              error={errors?.timeSlot}
              placeholder="Select time slot"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Purpose <span className="text-destructive">*</span>
            </label>
            <textarea
              value={formData?.eventPurpose}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, eventPurpose: e?.target?.value }));
                if (errors?.eventPurpose) {
                  setErrors(prev => ({ ...prev, eventPurpose: undefined }));
                }
              }}
              placeholder="Describe your event purpose in detail..."
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors?.eventPurpose 
                  ? 'border-destructive focus:ring-destructive' :'border-input focus:ring-ring'
              } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-250 resize-none`}
            />
            {errors?.eventPurpose && (
              <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                <Icon name="AlertCircle" size={14} />
                {errors?.eventPurpose}
              </p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Write at least 10 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Required Facilities <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <Checkbox
                label="Projector"
                description="For presentations"
                checked={formData?.facilities?.projector}
                onChange={(e) => handleFacilityChange('projector', e?.target?.checked)}
              />
              <Checkbox
                label="Microphone System"
                description="For audio"
                checked={formData?.facilities?.microphone}
                onChange={(e) => handleFacilityChange('microphone', e?.target?.checked)}
              />
              <Checkbox
                label="Seating: 100 capacity"
                description="For small events"
                checked={formData?.facilities?.seating100}
                onChange={(e) => handleFacilityChange('seating100', e?.target?.checked)}
              />
              <Checkbox
                label="Seating: 200 capacity"
                description="For medium events"
                checked={formData?.facilities?.seating200}
                onChange={(e) => handleFacilityChange('seating200', e?.target?.checked)}
              />
              <Checkbox
                label="Seating: 500 capacity"
                description="For large events"
                checked={formData?.facilities?.seating500}
                onChange={(e) => handleFacilityChange('seating500', e?.target?.checked)}
              />
            </div>
            {errors?.facilities && (
              <p className="mt-3 text-sm text-destructive flex items-center gap-1">
                <Icon name="AlertCircle" size={14} />
                {errors?.facilities}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              variant="default"
              size="lg"
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
              fullWidth
              className="sm:flex-1"
            >
              {isSubmitting ? 'Submiting...' : 'Submit Request'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              iconName="FileText"
              iconPosition="left"
              onClick={() => navigate('/booking-request-form')}
              className="sm:w-auto"
            >
              Detailed Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickBookingPanel;