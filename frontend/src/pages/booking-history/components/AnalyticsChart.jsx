import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsChart = ({ bookingData }) => {
  const monthlyData = [
    { month: 'Jan', approved: 12, rejected: 3, pending: 2 },
    { month: 'Feb', approved: 15, rejected: 2, pending: 4 },
    { month: 'Mar', approved: 18, rejected: 4, pending: 3 },
    { month: 'Apr', approved: 14, rejected: 5, pending: 2 },
    { month: 'May', approved: 20, rejected: 3, pending: 5 },
    { month: 'Jun', approved: 16, rejected: 2, pending: 3 }
  ];

  const statusData = [
    { name: 'Approved', value: 95, color: 'var(--color-success)' },
    { name: 'Rejected', value: 19, color: 'var(--color-destructive)' },
    { name: 'Pending', value: 19, color: 'var(--color-warning)' },
    { name: 'Cancelled', value: 8, color: 'var(--color-muted-foreground)' }
  ];

  const auditoriumData = [
    { name: 'Main Auditorium', value: 41 },
    { name: 'Seminar Hall', value: 32 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-4 md:p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Monthly Booking Trends</h3>
        </div>
        <div className="w-full h-80" aria-label="Monthly booking trends bar chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Bar dataKey="approved" fill="var(--color-success)" name="Approved" />
              <Bar dataKey="rejected" fill="var(--color-destructive)" name="Rejected" />
              <Bar dataKey="pending" fill="var(--color-warning)" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="PieChart" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Status Distribution</h3>
          </div>
          <div className="w-full h-64" aria-label="Booking status distribution pie chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="Building2" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Auditorium Utilization</h3>
          </div>
          <div className="space-y-4">
            {auditoriumData?.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{item?.name}</span>
                  <span className="text-sm font-semibold text-primary">{item?.value} bookings</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item?.value / 45) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;