import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import FormHeader from './components/FormHeader';
import EventDetailsSection from './components/EventDetailsSection';
import FacilityRequirementsSection from './components/FacilityRequirementsSection';
import SubmissionSection from './components/SubmissionSection';
import Icon from '../../components/AppIcon';

const BookingRequestForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);

  const [formData, setFormData] = useState({
    eventType: '',
    eventTitle: '',
    venue: '',
    eventStartDate: '',
    eventEndDate: '',
    startTime: '',
    endTime: '',
    expectedAttendees: '',
    eventPurpose: '',
    seatingArrangement: '',
    seatingCapacity: '',
    stageRequirement: '',
    technicalEquipment: {
      projector: false,
      microphone: false,
      soundSystem: false,
      whiteboard: false,
      videoConferencing: false,
      wifi: false
    },
    additionalServices: {
      catering: false,
      photography: false,
      recording: false,
      parking: false
    },
    specialRequirements: '',
    priority: 'normal',
    specialInstructions: '',
    acknowledgeFCFS: false,
    confirmAccuracy: false
  });

  const [errors, setErrors] = useState({});

  const mockExistingBookings = [
    {
      eventTitle: 'Annual Tech Conference 2026',
      eventStartDate: '2026-01-20',
      eventEndDate: '2026-01-20',
      startTime: '09:00',
      endTime: '11:00',
      status: 'approved'
    },
    {
      eventTitle: 'Cultural Festival Opening Ceremony',
      eventStartDate: '2026-01-20',
      eventEndDate: '2026-01-20',
      startTime: '15:00',
      endTime: '17:00',
      status: 'approved'
    },
    {
      eventTitle: 'Guest Lecture Series',
      eventStartDate: '2026-01-25',
      eventEndDate: '2026-01-25',
      startTime: '11:00',
      endTime: '13:00',
      status: 'approved'
    }
  ];

  const [conflictingBookings, setConflictingBookings] = useState([]);

  useEffect(() => {
    if (formData?.eventStartDate && formData?.startTime && formData?.endTime) {
      checkAvailability();
    }
  }, [formData?.eventStartDate, formData?.startTime, formData?.endTime]);

  const checkAvailability = () => {
    const conflicts = mockExistingBookings?.filter(
      (booking) =>
        booking?.eventStartDate === formData?.eventStartDate &&
        booking?.startTime === formData?.startTime &&
        booking?.endTime === formData?.endTime &&
        booking?.status === 'approved'
    );

    if (conflicts?.length > 0) {
      setAvailabilityStatus({
        available: false,
        message: 'The selected time slot is not available. Please choose another time.'
      });
      setConflictingBookings(conflicts);
    } else {
      setAvailabilityStatus({
        available: true,
        message: 'The selected time slot is available. You can proceed.'
      });
      setConflictingBookings([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (category, name, checked) => {
    if (category === 'technicalEquipment' || category === 'additionalServices') {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev?.[category],
          [name]: checked
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [category]: checked
      }));

      if (errors?.[category]) {
        setErrors((prev) => ({
          ...prev,
          [category]: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.eventType) {
      newErrors.eventType = 'Select the type of program';
    }

    if (!formData?.eventTitle?.trim()) {
      newErrors.eventTitle = 'Program name is required';
    }

    if (!formData?.venue) {
      newErrors.venue = 'Select a venue';
    }

    if (!formData?.eventStartDate) {
      newErrors.eventStartDate = 'Select start date';
    }

    if (!formData?.eventEndDate) {
      newErrors.eventEndDate = 'Select end date';
    }

    if (formData?.eventStartDate && formData?.eventEndDate && formData?.eventEndDate < formData?.eventStartDate) {
      newErrors.eventEndDate = 'End date cannot be before start date';
    }

    if (!formData?.startTime) {
      newErrors.startTime = 'Select start time';
    }

    if (!formData?.endTime) {
      newErrors.endTime = 'Select end time';
    }

    if (formData?.startTime && formData?.endTime && formData?.endTime <= formData?.startTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (!formData?.expectedAttendees || formData?.expectedAttendees <= 0) {
      newErrors.expectedAttendees = 'Enter the number of attendees';
    }

    if (!formData?.eventPurpose?.trim()) {
      newErrors.eventPurpose = 'Enter the objective of the program';
    }

    if (!formData?.seatingArrangement) {
      newErrors.seatingArrangement = 'Choose a seating arrangement';
    }

    if (!formData?.seatingCapacity || formData?.seatingCapacity <= 0) {
      newErrors.seatingCapacity = 'Enter seating capacity';
    }

    if (!formData?.priority) {
      newErrors.priority = 'Select priority level';
    }

    if (!formData?.acknowledgeFCFS) {
      newErrors.acknowledgeFCFS = 'Please acknowledge the FCFS policy';
    }

    if (!formData?.confirmAccuracy) {
      newErrors.confirmAccuracy = 'Please confirm the accuracy of the information';
    }

    if (availabilityStatus && !availabilityStatus?.available) {
      newErrors.startTime = 'The selected time slot is not available';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/booking-history');
    }, 2000);
  };

  const handleSaveDraft = () => {
    navigate('/faculty-dashboard');
  };

  return (
    <MainLayout userRole="faculty">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs />

        <FormHeader />

        {Object.keys(errors)?.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
              <div>
                <p className="text-sm font-medium text-destructive mb-2">
                  Please correct the following errors:
                </p>
                <ul className="text-xs text-destructive space-y-1 list-disc list-inside">
                  {Object.values(errors)?.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <EventDetailsSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            availabilityStatus={availabilityStatus}
            conflictingBookings={conflictingBookings}
          />

          <FacilityRequirementsSection
            formData={formData}
            errors={errors}
            onCheckboxChange={handleCheckboxChange}
            onInputChange={handleInputChange}
          />

          <SubmissionSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingRequestForm;