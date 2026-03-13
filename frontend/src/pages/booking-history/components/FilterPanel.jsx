import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onReset, 
  onExport,
  resultCount 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' }
  ];

  const auditoriumOptions = [
    { value: 'all', label: 'All Auditoriums' },
    { value: 'main-auditorium', label: 'Main Auditorium' },
    { value: 'seminar-hall', label: 'Seminar Hall' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {resultCount > 0 && (
            <span className="text-sm text-muted-foreground">
              ({resultCount} results)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="text"
          label="Search Faculty/Event"
          placeholder="Search by name or event..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Auditorium"
          options={auditoriumOptions}
          value={filters?.auditorium}
          onChange={(value) => onFilterChange('auditorium', value)}
        />

        <Input
          type="date"
          label="Event Date From"
          value={filters?.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="date"
          label="Event Date To"
          value={filters?.dateTo}
          onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
        />

        <Input
          type="date"
          label="Submission Date From"
          value={filters?.submissionFrom}
          onChange={(e) => onFilterChange('submissionFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="Submission Date To"
          value={filters?.submissionTo}
          onChange={(e) => onFilterChange('submissionTo', e?.target?.value)}
        />

        <div className="flex items-end">
          <Button
            variant="secondary"
            fullWidth
            iconName="Search"
            iconPosition="left"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;