import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import CalendarHeader from './components/CalendarHeader';
import CalendarFilters from './components/CalendarFilters';
import DayView from './components/DayView';
import WeekView from './components/WeekView';
import MonthView from './components/MonthView';

const BookingCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedAuditorium, setSelectedAuditorium] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const mockBookings = [
    {
      id: 1,
      eventTitle: "National Science Conference 2026",
      facultyName: "Dr. Rajesh Kumar",
      department: "Physics Department",
      date: new Date(2026, 0, 15),
      timeSlot: "09:00 - 12:00",
      auditorium: "Main Auditorium (500 Seats)",
      purpose: "National level science conference where scientists and researchers from across the country will participate. This conference will discuss the latest scientific research and technological progress.",
      facilities: ["Projector", "Microphone", "Air Conditioning", "Wi-Fi"],
      expectedAttendees: 450,
      status: "confirmed",
      approvalHistory: [
        {
          action: "Request Submitted",
          by: "Dr. Rajesh Kumar",
          timestamp: new Date(2026, 0, 1, 10, 30)
        },
        {
          action: "Approved",
          by: "Dr. Anil Sharma (Auditorium Manager)",
          timestamp: new Date(2026, 0, 2, 14, 15)
        }
      ]
    },
    {
      id: 2,
      eventTitle: "Student Talent Show Program",
      facultyName: "Prof. Priya Sharma",
      department: "Arts Department",
      date: new Date(2026, 0, 15),
      timeSlot: "14:00 - 17:00",
      auditorium: "Seminar Hall (200 Seats)",
      purpose: "Annual student talent show program showcasing students' talents in various art forms.",
      facilities: ["Sound System", "Stage Lighting", "Microphone"],
      expectedAttendees: 180,
      status: "pending",
      approvalHistory: [
        {
          action: "Request Submitted",
          by: "Prof. Priya Sharma",
          timestamp: new Date(2026, 0, 10, 9, 0)
        }
      ]
    },
    {
      id: 3,
      eventTitle: "International Yoga Day Celebration",
      facultyName: "Dr. Sunita Verma",
      department: "Physical Education Department",
      date: new Date(2026, 0, 16),
      timeSlot: "06:00 - 08:00",
      auditorium: "Main Auditorium (500 Seats)",
      purpose: "Special yoga session and health awareness program on the occasion of International Yoga Day.",
      facilities: ["Sound System", "Yoga Mats", "Projector"],
      expectedAttendees: 300,
      status: "confirmed",
      approvalHistory: [
        {
          action: "Request Submitted",
          by: "Dr. Sunita Verma",
          timestamp: new Date(2025, 11, 20, 11, 0)
        },
        {
          action: "Approved",
          by: "Dr. Anil Sharma (Auditorium Manager)",
          timestamp: new Date(2025, 11, 21, 16, 30)
        }
      ]
    },
    {
      id: 4,
      eventTitle: "Technical Workshop - AI and Machine Learning",
      facultyName: "Prof. Amit Patel",
      department: "Computer Science Department",
      date: new Date(2026, 0, 17),
      timeSlot: "10:00 - 13:00",
      auditorium: "Conference Room (100 Seats)",
      purpose: "Practical workshop on Artificial Intelligence and Machine Learning providing hands-on experience to students.",
      facilities: ["Projector", "Wi-Fi", "Whiteboard", "Computer Lab Access"],
      expectedAttendees: 85,
      status: "confirmed",
      approvalHistory: [
        {
          action: "Request Submitted",
          by: "Prof. Amit Patel",
          timestamp: new Date(2026, 0, 5, 14, 20)
        },
        {
          action: "Approved",
          by: "Dr. Anil Sharma (Auditorium Manager)",
          timestamp: new Date(2026, 0, 6, 10, 45)
        }
      ]
    },
    {
      id: 5,
      eventTitle: "Literary Symposium",
      facultyName: "Dr. Meena Desai",
      department: "Hindi Literature Department",
      date: new Date(2026, 0, 18),
      timeSlot: "15:00 - 18:00",
      auditorium: "Mini Auditorium (150 Seats)",
      purpose: "Special symposium on contemporary Hindi literature featuring renowned writers and poets.",
      facilities: ["Microphone", "Projector", "Air Conditioning"],
      expectedAttendees: 120,
      status: "pending",
      approvalHistory: [
        {
          action: "Request Submitted",
          by: "Dr. Meena Desai",
          timestamp: new Date(2026, 0, 12, 11, 30)
        }
      ]
    },
    {
      id: 6,
      eventTitle: "Startup Pitch Competition",
      facultyName: "Prof. Vikram Singh",
      department: "Management Department",
      date: new Date(2026, 0, 19),
      timeSlot: "09:00 - 12:00",
      auditorium: "Seminar Hall (200 Seats)",
      purpose: "Startup idea pitch competition for student entrepreneurs featuring investors and industry experts.",
      facilities: ["Projector", "Microphone", "Wi-Fi", "Whiteboard"],
      expectedAttendees: 150,
      status: "confirmed",
      approvalHistory: [
        {
          action: "Request Submitted",
          by: "Prof. Vikram Singh",
          timestamp: new Date(2025, 11, 28, 15, 0)
        },
        {
          action: "Approved",
          by: "Dr. Anil Sharma (Auditorium Manager)",
          timestamp: new Date(2025, 11, 29, 9, 30)
        }
      ]
    },
    {
      id: 7,
      eventTitle: "Environmental Awareness Seminar",
      facultyName: "Dr. Ravi Kumar",
      department: "Environmental Science Department",
      date: new Date(2026, 0, 20),
      timeSlot: "11:00 - 14:00",
      auditorium: "Conference Room (100 Seats)",
      purpose: "Awareness seminar on climate change and environmental conservation.",
      facilities: ["Projector", "Microphone", "Air Conditioning"],
      expectedAttendees: 90,
      status: "cancelled",
      approvalHistory: [
        {
          action: "Request Submitted",
          by: "Dr. Ravi Kumar",
          timestamp: new Date(2026, 0, 8, 10, 0)
        },
        {
          action: "Approved",
          by: "Dr. Anil Sharma (Auditorium Manager)",
          timestamp: new Date(2026, 0, 9, 14, 0)
        },
        {
          action: "Cancelled",
          by: "Dr. Ravi Kumar",
          timestamp: new Date(2026, 0, 11, 16, 0)
        }
      ]
    }
  ];

  const [bookings, setBookings] = useState(mockBookings);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'day') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate?.setDate(currentDate?.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate?.setMonth(currentDate?.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    setViewMode('day');
  };

  const handleRefresh = () => {
    setBookings([...mockBookings]);
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
  };

  const handleClosePanel = () => {
    setSelectedBooking(null);
  };

  const handleEditBooking = (booking) => {
    console.log('Edit booking:', booking);
  };

  const handleCancelBooking = (booking) => {
    console.log('Cancel booking:', booking);
  };

  const getFilteredBookings = () => {
    return bookings?.filter(booking => {
      const auditoriumMatch = selectedAuditorium === 'all' || 
        booking?.auditorium?.includes(selectedAuditorium);
      const statusMatch = selectedStatus === 'all' || booking?.status === selectedStatus;
      return auditoriumMatch && statusMatch;
    });
  };

  const filteredBookings = getFilteredBookings();

  return (
    <MainLayout userRole="manager">
      <div className="space-y-6">
        <Breadcrumbs />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Booking Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive view and management of auditorium bookings
            </p>
          </div>
        </div>

        <CalendarFilters
          selectedAuditorium={selectedAuditorium}
          onAuditoriumChange={setSelectedAuditorium}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onRefresh={handleRefresh}
        />

        {!isMobile && (
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigate={handleNavigate}
            onTodayClick={handleTodayClick}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isMobile ? (
              pass
            ) : (
              <>
                {viewMode === 'day' && (
                  <DayView
                    bookings={filteredBookings}
                    selectedBooking={selectedBooking}
                    onBookingSelect={handleBookingSelect}
                  />
                )}
                {viewMode === 'week' && (
                  <WeekView
                    bookings={filteredBookings}
                    currentDate={currentDate}
                    selectedBooking={selectedBooking}
                    onBookingSelect={handleBookingSelect}
                  />
                )}
                {viewMode === 'month' && (
                  <MonthView
                    bookings={filteredBookings}
                    currentDate={currentDate}
                    selectedBooking={selectedBooking}
                    onBookingSelect={handleBookingSelect}
                    onDateSelect={handleDateSelect}
                  />
                )}
              </>
            )}
          </div>

          
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingCalendarView;