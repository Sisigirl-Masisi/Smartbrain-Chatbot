import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationHeader from '../../components/NavigationHeader';
import BottomNavigation from '../../components/BottomNavigation';
import ConnectionStatus from '../../components/ConnectionStatus';
import ConversationCard from './components/ConversationCard';
import SearchFilters from './components/SearchFilters';
import ConversationDetail from './components/ConversationDetail';
import ExportModal from './components/ExportModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import RenameModal from './components/RenameModal';
import ShareModal from './components/ShareModal';
import EmptyState from './components/EmptyState';
import BulkActions from './components/BulkActions';

const ConversationHistory = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [selectedConversations, setSelectedConversations] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'all',
    topic: 'all',
    responseType: 'all',
    sortBy: 'recent'
  });

  const [modals, setModals] = useState({
    export: false,
    delete: false,
    rename: false,
    share: false
  });

  const mockConversations = [
    {
      id: 1,
      title: "React Performance Optimization Strategies",
      snippet: "Discussed various techniques for optimizing React applications including code splitting, lazy loading, memoization, and virtual DOM optimization. Covered best practices for reducing re-renders and improving bundle size.",
      date: new Date(2026, 0, 15, 14, 30),
      messageCount: 24,
      tags: ["Technical", "React", "Performance"],
      startTime: new Date(2026, 0, 15, 14, 30),
      endTime: new Date(2026, 0, 15, 15, 45)
    },
    {
      id: 2,
      title: "Machine Learning Model Training Best Practices",
      snippet: "Explored data preprocessing techniques, feature engineering, model selection criteria, hyperparameter tuning strategies, and cross-validation methods for building robust ML models.",
      date: new Date(2026, 0, 14, 10, 15),
      messageCount: 18,
      tags: ["Research", "Machine Learning", "Data Science"],
      startTime: new Date(2026, 0, 14, 10, 15),
      endTime: new Date(2026, 0, 14, 11, 30)
    },
    {
      id: 3,
      title: "Creative Writing: Sci-Fi Short Story Development",
      snippet: "Brainstormed plot ideas for a dystopian science fiction story set in 2150. Developed character arcs, world-building elements, and narrative structure for a compelling short story.",
      date: new Date(2026, 0, 13, 16, 45),
      messageCount: 32,
      tags: ["Creative", "Writing", "Fiction"],
      startTime: new Date(2026, 0, 13, 16, 45),
      endTime: new Date(2026, 0, 13, 18, 20)
    },
    {
      id: 4,
      title: "Python Data Analysis with Pandas",
      snippet: "Learned advanced Pandas operations including data cleaning, transformation, aggregation, and visualization. Covered handling missing data, merging datasets, and optimizing dataframe operations.",
      date: new Date(2026, 0, 12, 9, 0),
      messageCount: 15,
      tags: ["Coding", "Python", "Data Analysis"],
      startTime: new Date(2026, 0, 12, 9, 0),
      endTime: new Date(2026, 0, 12, 10, 15)
    },
    {
      id: 5,
      title: "Database Design and Normalization Principles",
      snippet: "Discussed relational database design, normalization forms (1NF through 5NF), entity-relationship modeling, indexing strategies, and query optimization techniques for efficient data storage.",
      date: new Date(2026, 0, 11, 13, 30),
      messageCount: 21,
      tags: ["Technical", "Database", "SQL"],
      startTime: new Date(2026, 0, 11, 13, 30),
      endTime: new Date(2026, 0, 11, 14, 50)
    },
    {
      id: 6,
      title: "Digital Marketing Strategy for Startups",
      snippet: "Explored cost-effective marketing channels, content marketing strategies, SEO optimization, social media engagement tactics, and analytics-driven decision making for early-stage companies.",
      date: new Date(2026, 0, 10, 11, 0),
      messageCount: 19,
      tags: ["General", "Marketing", "Business"],
      startTime: new Date(2026, 0, 10, 11, 0),
      endTime: new Date(2026, 0, 10, 12, 25)
    },
    {
      id: 7,
      title: "Cybersecurity Fundamentals and Threat Prevention",
      snippet: "Covered network security principles, encryption methods, authentication protocols, common vulnerabilities, penetration testing basics, and incident response procedures.",
      date: new Date(2026, 0, 9, 15, 15),
      messageCount: 27,
      tags: ["Technical", "Security", "Networking"],
      startTime: new Date(2026, 0, 9, 15, 15),
      endTime: new Date(2026, 0, 9, 16, 45)
    },
    {
      id: 8,
      title: "Climate Change Impact Analysis",
      snippet: "Analyzed current climate data, discussed greenhouse gas emissions, renewable energy solutions, carbon footprint reduction strategies, and global policy initiatives for environmental sustainability.",
      date: new Date(2026, 0, 8, 10, 30),
      messageCount: 16,
      tags: ["Research", "Environment", "Science"],
      startTime: new Date(2026, 0, 8, 10, 30),
      endTime: new Date(2026, 0, 8, 11, 40)
    }
  ];

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConversations(mockConversations);
      setFilteredConversations(mockConversations);
      setIsLoading(false);
    };

    loadConversations();
  }, []);

  useEffect(() => {
    let filtered = [...conversations];

    if (searchQuery) {
      filtered = filtered?.filter(conv =>
        conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        conv?.snippet?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        conv?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    if (activeFilters?.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered?.filter(conv => {
        const convDate = new Date(conv.date);
        const diffDays = Math.ceil((now - convDate) / (1000 * 60 * 60 * 24));
        
        switch (activeFilters?.dateRange) {
          case 'today': return diffDays === 0;
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          case 'quarter': return diffDays <= 90;
          case 'year': return diffDays <= 365;
          default: return true;
        }
      });
    }

    if (activeFilters?.topic !== 'all') {
      filtered = filtered?.filter(conv =>
        conv?.tags?.some(tag => tag?.toLowerCase()?.includes(activeFilters?.topic?.toLowerCase()))
      );
    }

    switch (activeFilters?.sortBy) {
      case 'recent':
        filtered?.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'messages':
        filtered?.sort((a, b) => b?.messageCount - a?.messageCount);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      default:
        break;
    }

    setFilteredConversations(filtered);
  }, [searchQuery, activeFilters, conversations]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowDetailPanel(true);
  };

  const handleCloseDetail = () => {
    setShowDetailPanel(false);
  };

  const openModal = (modalName, conversation) => {
    setSelectedConversation(conversation);
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  const handleExport = (exportData) => {
    console.log('Exporting conversation:', exportData);
    closeModal('export');
  };

  const handleDelete = (conversation) => {
    setConversations(conversations?.filter(c => c?.id !== conversation?.id));
    setSelectedConversation(null);
    setShowDetailPanel(false);
    closeModal('delete');
  };

  const handleRename = (updatedConversation) => {
    setConversations(conversations?.map(c =>
      c?.id === updatedConversation?.id ? updatedConversation : c
    ));
    if (selectedConversation?.id === updatedConversation?.id) {
      setSelectedConversation(updatedConversation);
    }
    closeModal('rename');
  };

  const handleShare = (shareData) => {
    console.log('Sharing conversation:', shareData);
    closeModal('share');
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveFilters({
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
    <>
      <NavigationHeader 
        userRole="user"
        userName="John Doe"
        userEmail="john.doe@example.com"
      />
      <main className="main-content with-bottom-nav bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                Conversation History
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Browse and manage your AI chat conversations
              </p>
            </div>
            <ConnectionStatus className="hidden lg:flex" />
          </div>

          <SearchFilters
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />

          <div className="mt-6 md:mt-8">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6]?.map((i) => (
                  <div key={i} className="skeleton h-64 rounded-xl"></div>
                ))}
              </div>
            ) : filteredConversations?.length === 0 ? (
              <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={clearAllFilters}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className={`grid grid-cols-1 ${showDetailPanel ? 'lg:grid-cols-2' : 'lg:grid-cols-2 xl:grid-cols-3'} gap-4 md:gap-6`}>
                  <div className={`${showDetailPanel ? 'lg:col-span-1' : 'lg:col-span-2 xl:col-span-3'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {filteredConversations?.map((conversation) => (
                        <ConversationCard
                          key={conversation?.id}
                          conversation={conversation}
                          onSelect={handleSelectConversation}
                          onRename={() => openModal('rename', conversation)}
                          onExport={() => openModal('export', conversation)}
                          onShare={() => openModal('share', conversation)}
                          onDelete={() => openModal('delete', conversation)}
                          isSelected={selectedConversation?.id === conversation?.id}
                        />
                      ))}
                    </div>
                  </div>

                  {showDetailPanel && (
                    <div className="hidden lg:block lg:col-span-1 sticky top-20 h-[calc(100vh-120px)]">
                      <ConversationDetail
                        conversation={selectedConversation}
                        onClose={handleCloseDetail}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {showDetailPanel && selectedConversation && (
            <div className="lg:hidden fixed inset-0 bg-background z-[150] overflow-y-auto">
              <div className="min-h-screen p-4">
                <ConversationDetail
                  conversation={selectedConversation}
                  onClose={handleCloseDetail}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <BottomNavigation userRole="user" />
      {modals?.export && selectedConversation && (
        <ExportModal
          conversation={selectedConversation}
          onClose={() => closeModal('export')}
          onExport={handleExport}
        />
      )}
      {modals?.delete && selectedConversation && (
        <DeleteConfirmModal
          conversation={selectedConversation}
          onClose={() => closeModal('delete')}
          onConfirm={handleDelete}
        />
      )}
      {modals?.rename && selectedConversation && (
        <RenameModal
          conversation={selectedConversation}
          onClose={() => closeModal('rename')}
          onRename={handleRename}
        />
      )}
      {modals?.share && selectedConversation && (
        <ShareModal
          conversation={selectedConversation}
          onClose={() => closeModal('share')}
          onShare={handleShare}
        />
      )}
      <BulkActions
        selectedCount={selectedConversations?.length}
        onExportAll={() => console.log('Export all')}
        onDeleteAll={() => console.log('Delete all')}
        onDeselectAll={() => setSelectedConversations([])}
      />
    </>
  );
};

export default ConversationHistory;