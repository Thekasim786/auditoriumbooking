import React from 'react';
import Button from '../../../components/ui/Button';

const StatusCard = ({ booking, onCancel }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-elevation-1">
      <h3 className="font-semibold text-foreground mb-2">
        {booking.eventTitle}
      </h3>
      <p>Date: {booking.eventDate}</p>
      <p>Time: {booking.timeSlot}</p>
      <p>Status: {booking.status}</p>

      {booking.status !== "CANCELLED" && (
        <Button
          variant="destructive"
          onClick={() => onCancel(booking.id)}
          className="mt-3"
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default StatusCard;