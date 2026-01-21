import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const stats = [
    {
      label: 'Total Requests',
      value: '12',
      change: '+3 this month',
      icon: 'FileText',
      bgColor: 'bg-primary/10',
      iconColor: 'var(--color-primary)'
    },
    {
      label: 'Approved',
      value: '8',
      change: '66.7% success rate',
      icon: 'CheckCircle',
      bgColor: 'bg-success/10',
      iconColor: 'var(--color-success)'
    },
    {
      label: 'Pending',
      value: '2',
      change: 'Awaiting review',
      icon: 'Clock',
      bgColor: 'bg-warning/10',
      iconColor: 'var(--color-warning)'
    },
    {
      label: 'Upcoming Events',
      value: '3',
      change: 'Next 30 days',
      icon: 'Calendar',
      bgColor: 'bg-secondary/10',
      iconColor: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-xl border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-250 p-4 md:p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={stat?.iconColor} />
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground mb-1">
              {stat?.label}
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {stat?.value}
            </p>
            <p className="text-xs text-muted-foreground">
              {stat?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;