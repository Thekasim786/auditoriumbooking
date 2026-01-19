import React from 'react';
import Icon from '../../../components/AppIcon';

const FormHeader = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-6 md:p-8 border border-border mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Icon name="FileText" size={28} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Auditorium Booking Request
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Auditorium Booking Request Form - Please fill in all required information
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
          <Icon name="Clock" size={16} className="text-primary" />
          <span className="text-sm text-foreground font-medium">
            {new Date()?.toLocaleDateString('en-GB')}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="CheckCircle2" size={18} color="var(--color-success)" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Processing Time</p>
            <p className="text-sm font-medium text-foreground">24-48 Hours</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Users" size={18} color="var(--color-primary)" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Booking Policy</p>
            <p className="text-sm font-medium text-foreground">FCFS Basis</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="Bell" size={18} color="var(--color-accent)" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Notification</p>
            <p className="text-sm font-medium text-foreground">Email Alert</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;