import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusCard from './StatusCard';

const StatusDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const fetchBookings = () => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  const endpoint =
    user.role === "ROLE_MANAGER"
      ? "http://localhost:8080/api/bookings/all-bookings"
      : "http://localhost:8080/api/bookings/my-bookings";

  fetch(endpoint, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    })
    .then(data => setBookings(data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
};

useEffect(() => {
  fetchBookings();
}, []);

  const handleViewDetails = (booking) => {
    navigate('/request-details', { state: { booking } });
  };

  const handleModify = (booking) => {
    navigate('/booking-request-form', { state: { modifyBooking: booking } });
  };

  const handleCancel = (id) => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    fetch(`http://localhost:8080/api/bookings/cancel/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
  if (!res.ok) throw new Error("Cancel failed");
  fetchBookings();   
})
      .catch(err => {
        console.error("Cancel error:", err);
      });
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading bookings...</div>;
  }

  if (error) {
    return <div className="p-6 text-destructive">{error}</div>;
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-2">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="Activity" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                Recent Booking Requests
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                View status of all your requests
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="default"
            iconName="History"
            iconPosition="left"
            onClick={() => navigate('/booking-history')}
            className="sm:w-auto"
          >
            View All History
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Icon name="Inbox" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Requests Found
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              There are no booking requests yet.
            </p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/booking-request-form')}
            >
              Create New Request
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {bookings.map((booking) => (
              <StatusCard
                key={booking.id}
                booking={booking}
                onViewDetails={handleViewDetails}
                onModify={handleModify}
                onCancel={() => handleCancel(booking.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusDashboard;