import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeScreen = ({ onStartConversation }) => {
  const features = [
    {
      icon: 'Zap',
      title: 'Instant Responses',
      description: 'Get quick, accurate answers to your questions in real-time'
    },
    {
      icon: 'FileText',
      title: 'Document Analysis',
      description: 'Upload files for intelligent document processing and insights'
    },
    {
      icon: 'Code',
      title: 'Code Assistance',
      description: 'Debug, explain, and generate code in multiple programming languages'
    },
    {
      icon: 'History',
      title: 'Conversation History',
      description: 'Access and search through all your previous conversations'
    }
  ];

  const quickStarters = [
    "Explain machine learning concepts",
    "Help me write a business proposal",
    "Debug my Python code",
    "Summarize this research paper"
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Icon name="Brain" size={40} color="var(--color-primary)" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Welcome to SmartBrain
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Your intelligent AI assistant for information retrieval, task assistance, and natural language conversations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="card hover:shadow-xl p-4 md:p-6"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <Icon name={feature?.icon} size={24} color="var(--color-primary)" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                {feature?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">
            Quick Start Suggestions
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {quickStarters?.map((starter, index) => (
              <button
                key={index}
                onClick={() => onStartConversation(starter)}
                className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-muted hover:bg-muted/80 text-foreground rounded-full transition-all duration-250 ease-out focus-ring hover:-translate-y-[1px]"
              >
                {starter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;