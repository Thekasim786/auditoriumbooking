import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FacilityRequirementsSection = ({
  formData,
  errors,
  onCheckboxChange,
  onInputChange
}) => {
  const seatingArrangementOptions = [
    { value: 'theater', label: 'Theater Style' },
    { value: 'classroom', label: 'Classroom Style' },
    { value: 'conference', label: 'Conference Style' },
    { value: 'u_shape', label: 'U-Shape' },
    { value: 'banquet', label: 'Banquet Style' }
  ];

  const technicalEquipment = [
    { name: 'projector', label: 'Projector', icon: 'Monitor' },
    { name: 'microphone', label: 'Microphone', icon: 'Mic' },
    { name: 'soundSystem', label: 'Sound System', icon: 'Volume2' },
    { name: 'whiteboard', label: 'Whiteboard', icon: 'PenTool' },
    { name: 'videoConferencing', label: 'Video Conferencing', icon: 'Video' },
    { name: 'wifi', label: 'High-Speed WiFi', icon: 'Wifi' }
  ];

  const additionalServices = [
    { name: 'catering', label: 'Catering Services', icon: 'Coffee' },
    { name: 'photography', label: 'Photography', icon: 'Camera' },
    { name: 'recording', label: 'Event Recording', icon: 'Video' },
    { name: 'parking', label: 'Parking Assistance', icon: 'Car' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-elevation-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <Icon name="Settings" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Facility Requirements</h2>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <Select
            label="Seating Arrangement"
            name="seatingArrangement"
            options={seatingArrangementOptions}
            value={formData?.seatingArrangement}
            onChange={(value) => onInputChange({ target: { name: 'seatingArrangement', value } })}
            error={errors?.seatingArrangement}
            required
            placeholder="Select seating style"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Seating Capacity Required"
            type="number"
            name="seatingCapacity"
            placeholder="Enter capacity"
            value={formData?.seatingCapacity}
            onChange={onInputChange}
            error={errors?.seatingCapacity}
            required
            min="1"
          />

          <Input
            label="Stage Required"
            type="text"
            name="stageRequirement"
            placeholder="e.g., Small, Medium, Large"
            value={formData?.stageRequirement}
            onChange={onInputChange}
          />
        </div>

        <div>
          <CheckboxGroup
            label="Technical Equipment"
            description="Choose technical equipment required"
            error={errors?.technicalEquipment}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {technicalEquipment?.map((equipment) => (
                <div
                  key={equipment?.name}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-250"
                >
                  <Icon name={equipment?.icon} size={18} className="text-primary" />
                  <Checkbox
                    label={equipment?.label}
                    checked={formData?.technicalEquipment?.[equipment?.name]}
                    onChange={(e) => onCheckboxChange('technicalEquipment', equipment?.name, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        <div>
          <CheckboxGroup
            label="Additional Services"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {additionalServices?.map((service) => (
                <div
                  key={service?.name}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-250"
                >
                  <Icon name={service?.icon} size={18} className="text-secondary" />
                  <Checkbox
                    label={service?.label}
                    checked={formData?.additionalServices?.[service?.name]}
                    onChange={(e) => onCheckboxChange('additionalServices', service?.name, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
          </CheckboxGroup>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Special Requirements
          </label>
          <textarea
            name="specialRequirements"
            value={formData?.specialRequirements}
            onChange={onInputChange}
            placeholder="Any special arrangements or requirements..."
            rows="3"
            maxLength="300"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {formData?.specialRequirements?.length}/300 characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityRequirementsSection;