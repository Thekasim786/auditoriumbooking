import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConflictDetectionPanel = ({ conflicts, onResolve, onViewAlternatives }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      high: 'border-error bg-error/5',
      medium: 'border-warning bg-warning/5',
      low: 'border-success bg-success/5'
    };
    return colors?.[severity] || colors?.low;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      high: 'AlertTriangle',
      medium: 'AlertCircle',
      low: 'Info'
    };
    return icons?.[severity] || icons?.low;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Conflict Detection</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {conflicts?.length} potential conflicts detected
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          </div>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {conflicts?.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={32} color="var(--color-success)" />
            </div>
            <h4 className="text-base font-semibold text-foreground mb-2">No Conflicts</h4>
            <p className="text-sm text-muted-foreground">All bookings are properly scheduled</p>
          </div>
        ) : (
          conflicts?.map((conflict) => (
            <div key={conflict?.id} className={`p-4 border-l-4 ${getSeverityColor(conflict?.severity)}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Icon 
                    name={getSeverityIcon(conflict?.severity)} 
                    size={20} 
                    color={
                      conflict?.severity === 'high' ? 'var(--color-error)' :
                      conflict?.severity === 'medium' ? 'var(--color-warning)' :
                      'var(--color-success)'
                    }
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{conflict?.type}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      conflict?.severity === 'high' ? 'bg-error/20 text-error' :
                      conflict?.severity === 'medium'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                    }`}>
                      {conflict?.severity}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{conflict?.description}</p>
                  
                  <div className="space-y-2 mb-3">
                    {conflict?.affectedBookings?.map((booking, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs bg-muted/50 rounded px-3 py-2">
                        <Icon name="Calendar" size={14} />
                        <span className="text-foreground font-medium">{booking?.facultyName}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{booking?.date}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{booking?.timeSlot}</span>
                      </div>
                    ))}
                  </div>

                  {conflict?.suggestions && conflict?.suggestions?.length > 0 && (
                    <div className="bg-primary/5 rounded-lg p-3 mb-3">
                      <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-2">
                        <Icon name="Lightbulb" size={14} />
                        Suggested Alternatives
                      </p>
                      <ul className="space-y-1">
                        {conflict?.suggestions?.map((suggestion, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="Eye"
                      onClick={() => onViewAlternatives(conflict?.id)}
                    >
                      View Alternatives
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      iconName="Check"
                      onClick={() => onResolve(conflict?.id)}
                    >
                      Resolve Conflict
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConflictDetectionPanel;