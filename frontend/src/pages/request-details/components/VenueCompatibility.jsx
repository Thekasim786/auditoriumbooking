import React from 'react';
import Icon from '../../../components/AppIcon';

const VenueCompatibility = ({ venues, requiredCapacity }) => {
  const getCompatibilityScore = (venue) => {
    let score = 0;
    if (venue?.capacity >= requiredCapacity) score += 40;
    score += (venue?.availableFacilities?.length / 10) * 60;
    return Math.min(score, 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Building" size={24} color="var(--color-primary)" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          Venue Compatibility Analysis
        </h2>
      </div>
      <div className="space-y-4 md:space-y-6">
        {venues?.map((venue, index) => {
          let score = getCompatibilityScore(venue);
          
          return (
            <div
              key={index}
              className="border border-border rounded-lg p-4 md:p-6 hover:border-primary/30 transition-all duration-250"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {venue?.name}
                    </h3>
                    {venue?.isAvailable ? (
                      <span className="px-2 py-1 bg-success/10 text-success border border-success/20 rounded-full text-xs font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-destructive/10 text-destructive border border-destructive/20 rounded-full text-xs font-medium">
                        Booked
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {venue?.location}
                  </p>
                </div>

                <div className={`px-4 py-3 rounded-lg border text-center ${getScoreBgColor(score)}`}>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">
                    Compatibility
                  </p>
                  <p className={`text-2xl md:text-3xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Icon name="Users" size={18} className="text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="text-sm md:text-base font-medium text-foreground">
                      {venue?.capacity} persons
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Icon name="Layers" size={18} className="text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="text-sm md:text-base font-medium text-foreground">
                      {venue?.floor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Icon name="CheckCircle" size={18} className="text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Facilities</p>
                    <p className="text-sm md:text-base font-medium text-foreground">
                      {venue?.availableFacilities?.length} items
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-2">
                  Available Facilities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {venue?.availableFacilities?.map((facility, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs md:text-sm"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VenueCompatibility;