import React from 'react';
import Icon from '../../../components/AppIcon';

const AuditTrail = ({ auditLogs }) => {
  const getActionIcon = (action) => {
    const icons = {
      created: 'Plus',
      viewed: 'Eye',
      updated: 'Edit',
      approved: 'CheckCircle',
      rejected: 'XCircle',
      commented: 'MessageSquare',
      downloaded: 'Download',
      exported: 'Share'
    };
    return icons?.[action] || 'Activity';
  };

  const getActionColor = (action) => {
    const colors = {
      created: 'text-secondary',
      viewed: 'text-muted-foreground',
      updated: 'text-warning',
      approved: 'text-success',
      rejected: 'text-destructive',
      commented: 'text-accent',
      downloaded: 'text-primary',
      exported: 'text-primary'
    };
    return colors?.[action] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Activity" size={24} color="var(--color-primary)" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          Audit Trail
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-muted-foreground">
                Timestamp
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-muted-foreground">
                Action
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-muted-foreground">
                User
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-medium text-muted-foreground">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {auditLogs?.map((log, index) => (
              <tr
                key={index}
                className="border-b border-border hover:bg-muted transition-colors duration-250"
              >
                <td className="py-3 px-4">
                  <div className="text-xs md:text-sm text-foreground whitespace-nowrap">
                    {log?.timestamp}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      name={getActionIcon(log?.action)}
                      size={16}
                      className={getActionColor(log?.action)}
                    />
                    <span className="text-xs md:text-sm font-medium text-foreground capitalize">
                      {log?.action}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-xs md:text-sm text-foreground">
                    {log?.user}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {log?.userRole}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-xs md:text-sm text-muted-foreground max-w-xs truncate">
                    {log?.details}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {auditLogs?.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <Icon
              name="FileSearch"
              size={48}
              className="text-muted-foreground mx-auto mb-3"
            />
            <p className="text-sm md:text-base text-muted-foreground">
              No audit logs available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;