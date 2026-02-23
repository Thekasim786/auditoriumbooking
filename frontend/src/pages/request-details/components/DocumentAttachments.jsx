import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentAttachments = ({ documents }) => {
  const [expandedDoc, setExpandedDoc] = useState(null);

  const getFileIcon = (type) => {
    const icons = {
      pdf: 'FileText',
      doc: 'FileText',
      docx: 'FileText',
      xls: 'Sheet',
      xlsx: 'Sheet',
      ppt: 'Presentation',
      pptx: 'Presentation',
      jpg: 'Image',
      jpeg: 'Image',
      png: 'Image',
      zip: 'Archive'
    };
    return icons?.[type] || 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024)?.toFixed(1) + ' KB';
    return (bytes / (1024 * 1024))?.toFixed(1) + ' MB';
  };

  const handleToggleExpand = (index) => {
    setExpandedDoc(expandedDoc === index ? null : index);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 lg:p-8 shadow-elevation-1">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Paperclip" size={24} color="var(--color-primary)" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          Document Attachments
        </h2>
      </div>
      <div className="space-y-3 md:space-y-4">
        {documents?.map((doc, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-250"
          >
            <div className="flex items-center gap-3 md:gap-4 p-4 bg-muted">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon
                  name={getFileIcon(doc?.type)}
                  size={24}
                  color="var(--color-primary)"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-medium text-foreground truncate">
                  {doc?.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {formatFileSize(doc?.size)}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {doc?.uploadedDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={() => console.log('Download:', doc?.name)}
                >
                  <span className="hidden sm:inline">Download</span>
                </Button>

                {doc?.description && (
                  <button
                    onClick={() => handleToggleExpand(index)}
                    className="p-2 hover:bg-card rounded-lg transition-colors duration-250"
                    aria-label="Toggle details"
                  >
                    <Icon
                      name={expandedDoc === index ? 'ChevronUp' : 'ChevronDown'}
                      size={20}
                    />
                  </button>
                )}
              </div>
            </div>

            {expandedDoc === index && doc?.description && (
              <div className="p-4 bg-card border-t border-border">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  Description:
                </p>
                <p className="text-sm md:text-base text-foreground">
                  {doc?.description}
                </p>
              </div>
            )}
          </div>
        ))}

        {documents?.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <Icon
              name="FileX"
              size={48}
              className="text-muted-foreground mx-auto mb-3"
            />
            <p className="text-sm md:text-base text-muted-foreground">
              No documents attached to this request
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentAttachments;