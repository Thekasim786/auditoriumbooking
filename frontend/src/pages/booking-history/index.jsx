import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import MainLayout from '../../components/navigation/MainLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import BookingTable from './components/BookingTable';
import BookingCard from './components/BookingCard';
import AnalyticsChart from './components/AnalyticsChart';
import ExportModal from './components/ExportModal';

const BookingHistory = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    auditorium: 'all',
    dateFrom: '',
    dateTo: '',
    submissionFrom: '',
    submissionTo: ''
  });
  
  const getUserRole = () => {
    const storedRole = sessionStorage.getItem('userRole');
    if (storedRole) return storedRole;
    return window.location.pathname.includes('/manager/') ? 'manager' : 'faculty';
  };
  
  const userRole = getUserRole();

  const mockBookings = [
    {
      requestId: "REQ-2026-001",
      eventDate: "2026-02-15",
      submissionDate: "2026-01-10",
      eventPurpose: "Annual Technical Symposium - TechFest 2026",
      auditorium: "Main Auditorium",
      startTime: "09:00",
      endTime: "17:00",
      status: "approved",
      facultyName: "Prof. Priya Sharma",
      department: "Computer Science",
      attendees: 500,
      duration: "8 hours",
      facilities: ["Projector", "Sound System", "Stage Lighting", "AC", "WiFi"],
      remarks: "Approved with all requested facilities. Please coordinate with technical team for setup."
    },
    {
      requestId: "REQ-2026-002",
      eventDate: "2026-02-20",
      submissionDate: "2026-01-12",
      eventPurpose: "Guest Lecture on Artificial Intelligence and Machine Learning",
      auditorium: "Seminar Hall",
      startTime: "14:00",
      endTime: "16:00",
      status: "approved",
      facultyName: "Dr. Rajesh Kumar",
      department: "Information Technology",
      attendees: 150,
      duration: "2 hours",
      facilities: ["Projector", "Microphone", "AC"],
      remarks: "Confirmed. Guest speaker arrangements completed."
    },
    {
      requestId: "REQ-2026-003",
      eventDate: "2026-02-18",
      submissionDate: "2026-01-15",
      eventPurpose: "Department Cultural Event - Freshers Welcome",
      auditorium: "Main Auditorium",
      startTime: "10:00",
      endTime: "16:00",
      status: "rejected",
      facultyName: "Prof. Anjali Verma",
      department: "Electronics",
      attendees: 400,
      duration: "6 hours",
      facilities: ["Sound System", "Stage Lighting", "Decorations"],
      remarks: "Rejected due to conflict with already scheduled technical symposium. Please choose alternative date."
    },
    {
      requestId: "REQ-2026-004",
      eventDate: "2026-03-05",
      submissionDate: "2026-01-20",
      eventPurpose: "Workshop on Data Science and Analytics",
      auditorium: "Main Auditorium",
      startTime: "10:00",
      endTime: "13:00",
      status: "pending",
      facultyName: "Dr. Suresh Patel",
      department: "Computer Science",
      attendees: 80,
      duration: "3 hours",
      facilities: ["Projector", "Whiteboard", "AC", "WiFi"],
      remarks: null
    },
    {
      requestId: "REQ-2026-005",
      eventDate: "2026-03-10",
      submissionDate: "2026-01-22",
      eventPurpose: "Industry Expert Talk on Cloud Computing",
      auditorium: "Seminar Hall",
      startTime: "15:00",
      endTime: "17:00",
      status: "approved",
      facultyName: "Prof. Meera Desai",
      department: "Information Technology",
      attendees: 120,
      duration: "2 hours",
      facilities: ["Projector", "Sound System", "AC"],
      remarks: "Approved. Industry expert confirmed attendance."
    },
    {
      requestId: "REQ-2025-156",
      eventDate: "2025-12-20",
      submissionDate: "2025-11-15",
      eventPurpose: "Annual Day Celebration 2025",
      auditorium: "Main Auditorium",
      startTime: "09:00",
      endTime: "18:00",
      status: "completed",
      facultyName: "Dr. Vikram Singh",
      department: "Administration",
      attendees: 600,
      duration: "9 hours",
      facilities: ["Projector", "Sound System", "Stage Lighting", "AC", "Decorations"],
      remarks: "Successfully completed. Excellent event management."
    },
    {
      requestId: "REQ-2025-157",
      eventDate: "2025-12-15",
      submissionDate: "2025-11-20",
      eventPurpose: "Placement Drive - Tech Companies",
      auditorium: "Seminar Hall",
      startTime: "09:00",
      endTime: "17:00",
      status: "completed",
      facultyName: "Prof. Kavita Joshi",
      department: "Training & Placement",
      attendees: 200,
      duration: "8 hours",
      facilities: ["Projector", "AC", "WiFi", "Tables & Chairs"],
      remarks: "Completed successfully. 45 students placed."
    },
    {
      requestId: "REQ-2026-006",
      eventDate: "2026-03-15",
      submissionDate: "2026-01-25",
      eventPurpose: "Research Paper Presentation Competition",
      auditorium: "Main Auditorium",
      startTime: "10:00",
      endTime: "15:00",
      status: "pending",
      facultyName: "Dr. Amit Gupta",
      department: "Research & Development",
      attendees: 100,
      duration: "5 hours",
      facilities: ["Projector", "Microphone", "AC", "WiFi"],
      remarks: null
    },
    {
      requestId: "REQ-2025-158",
      eventDate: "2025-11-10",
      submissionDate: "2025-10-15",
      eventPurpose: "Alumni Meet 2025",
      auditorium: "Main Auditorium",
      startTime: "11:00",
      endTime: "16:00",
      status: "cancelled",
      facultyName: "Prof. Neha Kapoor",
      department: "Alumni Relations",
      attendees: 300,
      duration: "5 hours",
      facilities: ["Sound System", "Projector", "AC", "Catering"],
      remarks: "Cancelled due to low alumni response. Rescheduled to next semester."
    },
    {
      requestId: "REQ-2026-007",
      eventDate: "2026-03-20",
      submissionDate: "2026-01-28",
      eventPurpose: "Hackathon 2026 - Code Sprint",
      auditorium: "Seminar Hall",
      startTime: "08:00",
      endTime: "20:00",
      status: "approved",
      facultyName: "Dr. Sanjay Mehta",
      department: "Computer Science",
      attendees: 150,
      duration: "12 hours",
      facilities: ["Projector", "WiFi", "AC", "Power Backup", "Refreshments"],
      remarks: "Approved for full day event. Technical support team assigned."
    }
  ];

  const [filteredBookings, setFilteredBookings] = useState(mockBookings);

  useEffect(() => {
    let filtered = [...mockBookings];

    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter(booking =>
        booking?.facultyName?.toLowerCase()?.includes(searchLower) ||
        booking?.eventPurpose?.toLowerCase()?.includes(searchLower) ||
        booking?.requestId?.toLowerCase()?.includes(searchLower)
      );
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter(booking => booking?.status === filters?.status);
    }

    if (filters?.auditorium !== 'all') {
      filtered = filtered?.filter(booking => 
        booking?.auditorium?.toLowerCase()?.replace(/\s+/g, '-') === filters?.auditorium
      );
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter(booking => 
        new Date(booking.eventDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(booking => 
        new Date(booking.eventDate) <= new Date(filters.dateTo)
      );
    }

    if (filters?.submissionFrom) {
      filtered = filtered?.filter(booking => 
        new Date(booking.submissionDate) >= new Date(filters.submissionFrom)
      );
    }

    if (filters?.submissionTo) {
      filtered = filtered?.filter(booking => 
        new Date(booking.submissionDate) <= new Date(filters.submissionTo)
      );
    }

    setFilteredBookings(filtered);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      auditorium: 'all',
      dateFrom: '',
      dateTo: '',
      submissionFrom: '',
      submissionTo: ''
    });
  };

  const handleViewDetails = (requestId) => {
    navigate(`/request-details?id=${requestId}`);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting with config:', exportConfig);
  };

  return (
    <>
      <Helmet>
        <title>Booking History - AuditoriumBooking</title>
        <meta name="description" content="View and manage your auditorium booking history with advanced filtering and analytics" />
      </Helmet>
      <MainLayout userRole={userRole}>
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <Breadcrumbs />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                Booking History
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track and analyze your auditorium booking requests
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={showAnalytics ? 'default' : 'outline'}
                size="sm"
                iconName="BarChart3"
                iconPosition="left"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                Analytics
              </Button>
              <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-md transition-all duration-250 ${
                    viewMode === 'table' ?'bg-background shadow-sm text-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Table view"
                >
                  <Icon name="Table" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-2 rounded-md transition-all duration-250 ${
                    viewMode === 'card' ?'bg-background shadow-sm text-foreground' :'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Card view"
                >
                  <Icon name="LayoutGrid" size={18} />
                </button>
              </div>
            </div>
          </div>

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            onExport={() => setShowExportModal(true)}
            resultCount={filteredBookings?.length}
          />

          {showAnalytics && (
            <AnalyticsChart bookingData={filteredBookings} />
          )}

          {filteredBookings?.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Try adjusting your filters or search criteria
              </p>
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              {viewMode === 'table' ? (
                <BookingTable
                  bookings={filteredBookings}
                  onViewDetails={handleViewDetails}
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  {filteredBookings?.map((booking) => (
                    <BookingCard
                      key={booking?.requestId}
                      booking={booking}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      </MainLayout>
    </>
  );
};

export default BookingHistory;