import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ApprovalPanel = ({ requestId, currentStatus, onApprove, onReject, onRequestModification }) => {
  const [actionType, setActionType] = useState('');
  const [reason, setReason] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const venueOptions = [
    { value: 'main-auditorium', label: 'Main Auditorium (Capacity: 500)' },
    { value: 'seminar-hall-a', label: 'Seminar Hall A (Capacity: 200)' },
    { value: 'conference-room-1', label: 'Conference Room 1 (Capacity: 100)' },
    { value: 'mini-auditorium', label: 'Mini Auditorium (Capacity: 150)' }
  ];

  const handleAction = (type) => {
    setActionType(type);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (actionType === 'approve' && onApprove) {
      onApprove(requestId, selectedVenue, reason);
    } else if (actionType === 'reject' && onReject) {
      onReject(requestId, reason);
    } else if (actionType === 'modify' && onRequestModification) {
      onRequestModification(requestId, reason);
    }
    
    setShowConfirmation(false);
    setReason('');
    setSelectedVenue('');
    setActionType('');
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setReason('');
    setSelectedVenue('');
    setActionType('');
  };

  if (currentStatus !== 'pending' && currentStatus !== 'under-review') {
    return null;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="ClipboardCheck" size={24} color="var(--color-primary)" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          Approval Actions
        </h2>
      </div>
      {!showConfirmation ? (
        <div className="space-y-4 md:space-y-6">
          <div className="bg-muted rounded-lg p-4 md:p-6">
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Review the request details carefully before taking action. All actions are logged and cannot be undone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <Button
                variant="success"
                fullWidth
                onClick={() => handleAction('approve')}
              >
                Approve
              </Button>

              <Button
                variant="warning"
                fullWidth
                onClick={() => handleAction('modify')}
              >
                Change
              </Button>

              <Button
                variant="destructive"
                fullWidth
                onClick={() => handleAction('reject')}
              >
                Reject
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <Icon name="Info" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base text-foreground font-medium mb-1">
                FCFS Policy Reminder
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Bookings are processed on First-Come, First-Served basis. Ensure venue availability before approval.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
              {actionType === 'approve' && 'Approve Booking Request'}
              {actionType === 'reject' && 'Reject Booking Request'}
              {actionType === 'modify' && 'Request Modifications'}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {actionType === 'approve' && 'Select venue and provide approval notes'}
              {actionType === 'reject' && 'Provide reason for rejection'}
              {actionType === 'modify' && 'Specify required changes'}
            </p>
          </div>

          {actionType === 'approve' && (
            <Select
              label="Assign Venue"
              description="Select the auditorium to allocate for this event"
              required
              options={venueOptions}
              value={selectedVenue}
              onChange={setSelectedVenue}
              placeholder="Choose venue"
            />
          )}

          <Input
            label={actionType === 'approve' ? 'Approval Notes (Optional)' : 'Reason (Required)'}
            type="text"
            placeholder={
              actionType === 'approve' ?'Add any special instructions or notes' :'Provide detailed reason for this action'
            }
            value={reason}
            onChange={(e) => setReason(e?.target?.value)}
            required={actionType !== 'approve'}
            description={
              actionType === 'reject' ?'This reason will be communicated to the faculty member'
                : actionType === 'modify' ?'Specify what changes are needed in the request' :''
            }
          />

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Button
              variant={actionType === 'approve' ? 'success' : actionType === 'reject' ? 'destructive' : 'warning'}
              iconName="Check"
              iconPosition="left"
              fullWidth
              onClick={handleConfirm}
              disabled={actionType !== 'approve' && !reason?.trim()}
            >
              Confirm {actionType === 'approve' ? 'Approval' : actionType === 'reject' ? 'Rejection' : 'Request'}
            </Button>

            <Button
              variant="outline"
              iconName="X"
              iconPosition="left"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalPanel;