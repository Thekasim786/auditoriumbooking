import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubmissionSection = ({
  formData,
  errors,
  onInputChange,
  onCheckboxChange,
  onSubmit,
  onSaveDraft,
  isSubmitting
}) => {
  const priorityOptions = [
    { value: 'normal', label: 'Normal Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-elevation-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon name="Send" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Submission Details</h2>
        </div>
      </div>
      <div className="space-y-6">
        <Select
          label="Request Priority"
          name="priority"
          options={priorityOptions}
          value={formData?.priority}
          onChange={(value) => onInputChange({ target: { name: 'priority', value } })}
          error={errors?.priority}
          required
          placeholder="Select priority level"
          description="Priority Level"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Special Instructions
          </label>
          <textarea
            name="specialInstructions"
            value={formData?.specialInstructions}
            onChange={onInputChange}
            placeholder="Any additional instructions for the auditorium manager..."
            rows="4"
            maxLength="400"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-250"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {formData?.specialInstructions?.length}/400 characters
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-2">
                FCFS Policy Information
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Bookings are processed on a First-Come, First-Served basis. Your request will be reviewed by the auditorium manager within 24-48 hours. You will receive a confirmation email once your booking is approved or if any clarifications are needed.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="I acknowledge the FCFS booking policy"
            checked={formData?.acknowledgeFCFS}
            onChange={(e) => onCheckboxChange('acknowledgeFCFS', null, e?.target?.checked)}
            error={errors?.acknowledgeFCFS}
            required
          />

          <Checkbox
            label="I confirm that all provided information is accurate"
            checked={formData?.confirmAccuracy}
            onChange={(e) => onCheckboxChange('confirmAccuracy', null, e?.target?.checked)}
            error={errors?.confirmAccuracy}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onSubmit}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            disabled={isSubmitting}
          >
            Submit Request
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onSaveDraft}
            iconName="Save"
            iconPosition="left"
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          By submitting this form, you agree to the terms and conditions of the auditorium booking system.
        </p>
      </div>
    </div>
  );
};

export default SubmissionSection;