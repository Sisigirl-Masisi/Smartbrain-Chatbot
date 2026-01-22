import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationTable = ({ conversations }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedConversations = [...conversations]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    return aValue > bValue ? modifier : -modifier;
  });

  const totalPages = Math.ceil(sortedConversations?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedConversations = sortedConversations?.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'active':
        return 'bg-primary/10 text-primary';
      case 'error':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Conversations</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('user')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground caption"
                >
                  User
                  <Icon name={sortField === 'user' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 hidden md:table-cell">
                <button
                  onClick={() => handleSort('query')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground caption"
                >
                  Query
                  <Icon name={sortField === 'query' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 hidden lg:table-cell">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground caption"
                >
                  Timestamp
                  <Icon name={sortField === 'timestamp' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground caption"
                >
                  Status
                  <Icon name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={14} />
                </button>
              </th>
              <th className="text-right py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground caption">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedConversations?.map((conversation) => (
              <tr key={conversation?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={conversation?.avatar}
                      alt={conversation?.avatarAlt}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">{conversation?.user}</span>
                  </div>
                </td>
                <td className="py-3 px-4 hidden md:table-cell">
                  <p className="text-sm text-foreground line-clamp-2">{conversation?.query}</p>
                </td>
                <td className="py-3 px-4 hidden lg:table-cell">
                  <span className="text-sm text-muted-foreground caption">{conversation?.timestamp}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium caption ${getStatusColor(conversation?.status)}`}>
                    {conversation?.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors focus-ring">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors focus-ring">
                      <Icon name="MoreVertical" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground caption">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedConversations?.length)} of {sortedConversations?.length} conversations
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors focus-ring ${
                    currentPage === pageNum
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationTable;