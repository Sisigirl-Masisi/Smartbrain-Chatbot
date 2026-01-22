import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ onSearch, onFilterChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last Year' }
  ];

  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'research', label: 'Research & Analysis' },
    { value: 'creative', label: 'Creative Writing' },
    { value: 'coding', label: 'Code Assistance' }
  ];

  const responseTypeOptions = [
    { value: 'all', label: 'All Response Types' },
    { value: 'text', label: 'Text Only' },
    { value: 'code', label: 'Code Snippets' },
    { value: 'mixed', label: 'Mixed Content' },
    { value: 'media', label: 'With Media' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'messages', label: 'Most Messages' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...activeFilters, [filterType]: value });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    onSearch('');
    onFilterChange({
      dateRange: 'all',
      topic: 'all',
      responseType: 'all',
      sortBy: 'recent'
    });
  };

  const hasActiveFilters = searchQuery || 
    activeFilters?.dateRange !== 'all' || 
    activeFilters?.topic !== 'all' || 
    activeFilters?.responseType !== 'all';

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            size="default"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            className="hidden md:flex"
          >
            Filters
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
          </Button>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={activeFilters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
            <Select
              label="Topic"
              options={topicOptions}
              value={activeFilters?.topic}
              onChange={(value) => handleFilterChange('topic', value)}
            />
            <Select
              label="Response Type"
              options={responseTypeOptions}
              value={activeFilters?.responseType}
              onChange={(value) => handleFilterChange('responseType', value)}
            />
            <Select
              label="Sort By"
              options={sortOptions}
              value={activeFilters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
          </div>
        )}

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground caption">
              {searchQuery && `Searching for "${searchQuery}"`}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;