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
import { authFetch, getUser, isManager } from '../../utils/auth';

const BookingHistory = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    auditorium: 'all',
    dateFrom: '',
    dateTo: '',
    submissionFrom: '',
    submissionTo: ''
  });

  const user = getUser();
  const userIsManager = isManager();

  // Fetch bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);

    try {
      // Manager sees all bookings, faculty sees only their own
      const endpoint = userIsManager
        ? '/manager/bookings'
        : '/faculty/bookings';

      const response = await authFetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();

      // Transform backend response to match component's expected format
      const transformed = data.map((booking, index) => ({
        requestId: `REQ-${new Date(booking.createdAt).getFullYear()}-${String(booking.id).padStart(3, '0')}`,
        id: booking.id,
        eventDate: booking.eventStartDate,
        eventEndDate: booking.eventEndDate,
        submissionDate: booking.createdAt ? booking.createdAt.split('T')[0] : '',
        eventPurpose: booking.eventTitle + (booking.eventPurpose ? ' - ' + booking.eventPurpose : ''),
        eventTitle: booking.eventTitle,
        eventType: booking.eventType,
        auditorium: booking.venue,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status.toLowerCase(),
        facultyName: booking.facultyName,
        facultyEmail: booking.facultyEmail,
        attendees: booking.expectedAttendees,
        duration: calculateDuration(booking.startTime, booking.endTime),
        facilities: formatFacilities(booking.technicalEquipment, booking.additionalServices),
        remarks: booking.managerRemarks,
        reviewedByName: booking.reviewedByName,
        reviewedAt: booking.reviewedAt,
        priority: booking.priority,
        seatingArrangement: booking.seatingArrangement,
        seatingCapacity: booking.seatingCapacity,
        specialRequirements: booking.specialRequirements,
        specialInstructions: booking.specialInstructions
      }));

      setBookings(transformed);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate duration string from start and end time
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    const totalMinutes = (eh * 60 + em) - (sh * 60 + sm);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
    return `${hours}h ${minutes}m`;
  };

  // Convert backend equipment/services maps into a flat array of names
  const formatFacilities = (technicalEquipment, additionalServices) => {
    const facilities = [];

    if (technicalEquipment) {
      Object.entries(technicalEquipment).forEach(([key, value]) => {
        if (value) {
          // Convert camelCase to Title Case: "soundSystem" → "Sound System"
          const formatted = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          facilities.push(formatted);
        }
      });
    }

    if (additionalServices) {
      Object.entries(additionalServices).forEach(([key, value]) => {
        if (value) {
          const formatted = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          facilities.push(formatted);
        }
      });
    }

    return facilities;
  };

  // Apply frontend filters
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    let filtered = [...bookings];

    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter(booking =>
        booking?.facultyName?.toLowerCase()?.includes(searchLower) ||
        booking?.eventPurpose?.toLowerCase()?.includes(searchLower) ||
        booking?.eventTitle?.toLowerCase()?.includes(searchLower) ||
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
  }, [filters, bookings]);

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
      <MainLayout userRole={userIsManager ? 'manager' : 'faculty'}>
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <Breadcrumbs />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                Booking History
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                {userIsManager
                  ? 'View and manage all auditorium booking requests'
                  : 'Track and analyze your auditorium booking requests'
                }
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Refresh button */}
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={fetchBookings}
                disabled={loading}
              >
                Refresh
              </Button>
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
                    viewMode === 'table' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Table view"
                >
                  <Icon name="Table" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-2 rounded-md transition-all duration-250 ${
                    viewMode === 'card' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
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
            resultCount={filteredBookings?.length}
            isManager={userIsManager}
          />

          {showAnalytics && (
            <AnalyticsChart bookingData={filteredBookings} />
          )}

          {/* Loading state */}
          {loading && (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Loading bookings...</h3>
              <p className="text-sm text-muted-foreground">Fetching data from server</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertCircle" size={32} className="text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load bookings</h3>
              <p className="text-sm text-muted-foreground mb-6">{error}</p>
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={fetchBookings}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredBookings?.length === 0 && (
            <div className="bg-card rounded-xl border border-border p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Icon name="Search" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {bookings.length === 0 ? 'No bookings yet' : 'No bookings found'}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {bookings.length === 0
                  ? (userIsManager
                    ? 'No booking requests have been submitted yet.'
                    : 'You haven\'t submitted any booking requests yet.')
                  : 'Try adjusting your filters or search criteria'
                }
              </p>
              {bookings.length === 0 && !userIsManager ? (
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/booking-request')}
                >
                  New Booking Request
                </Button>
              ) : (
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          )}

          {/* Bookings list */}
          {!loading && !error && filteredBookings?.length > 0 && (
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
      </MainLayout>
    </>
  );
};

export default BookingHistory;