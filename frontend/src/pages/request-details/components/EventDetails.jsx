import React from 'react';
import Icon from '../../../components/AppIcon';

const EventDetails = ({ event }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Event Details
      </h2>
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="text-sm md:text-base text-muted-foreground mb-2 block">
            Event Title
          </label>
          <p className="text-base md:text-lg font-semibold text-foreground">
            {event?.title}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name="Calendar" size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Event Date</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                {event?.date}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Time Slot</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                {event?.timeSlot}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name="Users" size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Expected Attendees</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                {event?.expectedAttendees} persons
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name="Timer" size={18} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Duration</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                {event?.duration}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm md:text-base text-muted-foreground mb-2 block">
            Event Type
          </label>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs md:text-sm font-medium">
              {event?.type}
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm md:text-base text-muted-foreground mb-2 block">
            Event Purpose
          </label>
          <div className="bg-muted rounded-lg p-3 md:p-4">
            <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-line">
              {event?.purpose}
            </p>
          </div>
        </div>

        {event?.specialRequirements && (
          <div>
            <label className="text-sm md:text-base text-muted-foreground mb-2 block">
              Special Requirements
            </label>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 md:p-4">
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {event?.specialRequirements}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;