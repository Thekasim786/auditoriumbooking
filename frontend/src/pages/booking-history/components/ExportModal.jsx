import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: 'all',
    customDateFrom: '',
    customDateTo: '',
    includeFields: {
      requestId: true,
      eventDate: true,
      submissionDate: true,
      eventPurpose: true,
      auditorium: true,
      status: true,
      facultyName: true,
      department: true,
      facilities: true,
      remarks: false
    }
  });

  if (!isOpen) return null;

  const formatOptions = [
    { value: 'csv', label: 'CSV Format' },
    { value: 'pdf', label: 'PDF Format' },
    { value: 'excel', label: 'Excel Format' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFieldToggle = (field) => {
    setExportConfig({
      ...exportConfig,
      includeFields: {
        ...exportConfig?.includeFields,
        [field]: !exportConfig?.includeFields?.[field]
      }
    });
  };

  const handleExport = () => {
    onExport(exportConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Download" size={20} color="var(--color-primary)" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Export Booking History</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportConfig?.format}
              onChange={(value) => setExportConfig({ ...exportConfig, format: value })}
            />

            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={exportConfig?.dateRange}
              onChange={(value) => setExportConfig({ ...exportConfig, dateRange: value })}
            />
          </div>

          {exportConfig?.dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                label="From Date"
                value={exportConfig?.customDateFrom}
                onChange={(e) => setExportConfig({ ...exportConfig, customDateFrom: e?.target?.value })}
              />
              <Input
                type="date"
                label="To Date"
                value={exportConfig?.customDateTo}
                onChange={(e) => setExportConfig({ ...exportConfig, customDateTo: e?.target?.value })}
              />
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">Include Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Request ID"
                checked={exportConfig?.includeFields?.requestId}
                onChange={() => handleFieldToggle('requestId')}
              />
              <Checkbox
                label="Event Date"
                checked={exportConfig?.includeFields?.eventDate}
                onChange={() => handleFieldToggle('eventDate')}
              />
              <Checkbox
                label="Submission Date"
                checked={exportConfig?.includeFields?.submissionDate}
                onChange={() => handleFieldToggle('submissionDate')}
              />
              <Checkbox
                label="Event Purpose"
                checked={exportConfig?.includeFields?.eventPurpose}
                onChange={() => handleFieldToggle('eventPurpose')}
              />
              <Checkbox
                label="Auditorium"
                checked={exportConfig?.includeFields?.auditorium}
                onChange={() => handleFieldToggle('auditorium')}
              />
              <Checkbox
                label="Status"
                checked={exportConfig?.includeFields?.status}
                onChange={() => handleFieldToggle('status')}
              />
              <Checkbox
                label="Faculty Name"
                checked={exportConfig?.includeFields?.facultyName}
                onChange={() => handleFieldToggle('facultyName')}
              />
              <Checkbox
                label="Department"
                checked={exportConfig?.includeFields?.department}
                onChange={() => handleFieldToggle('department')}
              />
              <Checkbox
                label="Facilities"
                checked={exportConfig?.includeFields?.facilities}
                onChange={() => handleFieldToggle('facilities')}
              />
              <Checkbox
                label="Remarks"
                checked={exportConfig?.includeFields?.remarks}
                onChange={() => handleFieldToggle('remarks')}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;