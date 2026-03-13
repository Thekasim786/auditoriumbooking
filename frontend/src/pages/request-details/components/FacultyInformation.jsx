import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FacultyInformation = ({ faculty }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Faculty Information
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={faculty?.profileImage}
              alt={faculty?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-3 md:space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
              {faculty?.name}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {faculty?.designation}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name="Building2" size={18} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Department</p>
                <p className="text-sm md:text-base font-medium text-foreground">
                  {faculty?.department}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name="Mail" size={18} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Email</p>
                <p className="text-sm md:text-base font-medium text-foreground break-all">
                  {faculty?.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name="Phone" size={18} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Phone</p>
                <p className="text-sm md:text-base font-medium text-foreground">
                  {faculty?.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name="Hash" size={18} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Employee ID</p>
                <p className="text-sm md:text-base font-medium text-foreground">
                  {faculty?.employeeId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyInformation;