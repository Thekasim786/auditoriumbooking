import React from 'react';
import Icon from '../../../components/AppIcon';

const FacilityRequirements = ({ facilities }) => {
  const getFacilityIcon = (type) => {
    const icons = {
      projector: 'Projector',
      microphone: 'Mic',
      speakers: 'Volume2',
      whiteboard: 'PenTool',
      'video-conferencing': 'Video',
      'stage-lighting': 'Lightbulb',
      'sound-system': 'Radio',
      podium: 'Box',
      'air-conditioning': 'Wind',
      wifi: 'Wifi'
    };
    return icons?.[type] || 'CheckCircle';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Facility Requirements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {facilities?.map((facility, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 md:p-4 bg-muted rounded-lg border border-border hover:border-primary/30 transition-all duration-250"
          >
            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon
                name={getFacilityIcon(facility?.type)}
                size={20}
                color="var(--color-primary)"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground">
                {facility?.name}
              </p>
              {facility?.quantity && (
                <p className="text-xs md:text-sm text-muted-foreground">
                  Qty: {facility?.quantity}
                </p>
              )}
            </div>
            <Icon
              name="CheckCircle"
              size={18}
              className="text-success flex-shrink-0"
            />
          </div>
        ))}
      </div>
      {facilities?.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <Icon
            name="AlertCircle"
            size={48}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="text-sm md:text-base text-muted-foreground">
            No specific facility requirements
          </p>
        </div>
      )}
    </div>
  );
};

export default FacilityRequirements;