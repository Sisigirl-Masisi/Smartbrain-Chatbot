import React, { useState, useRef, useEffect } from 'react';
import NavigationHeader from '../../components/NavigationHeader';
import BottomNavigation from '../../components/BottomNavigation';
import ConnectionStatus from '../../components/ConnectionStatus';
import TypingIndicator from '../../components/TypingIndicator';
import Icon from '../../components/AppIcon';
import ConversationSidebar from './components/ConversationSidebar';
import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';
import WelcomeScreen from './components/WelcomeScreen';

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const mockConversations = [
  {
    id: 1,
    title: "Machine Learning Basics",
    lastMessage: "Can you explain supervised learning?",
    lastMessageTime: new Date(Date.now() - 3600000)
  },
  {
    id: 2,
    title: "Python Code Review",
    lastMessage: "Here\'s the optimized version of your function",
    lastMessageTime: new Date(Date.now() - 7200000)
  },
  {
    id: 3,
    title: "Business Proposal Draft",
    lastMessage: "I\'ve created a comprehensive outline for your proposal",
    lastMessageTime: new Date(Date.now() - 86400000)
  },
  {
    id: 4,
    title: "Research Paper Summary",
    lastMessage: "The paper discusses quantum computing applications in cryptography",
    lastMessageTime: new Date(Date.now() - 172800000)
  },
  {
    id: 5,
    title: "Web Development Tips",
    lastMessage: "Here are best practices for React performance optimization",
    lastMessageTime: new Date(Date.now() - 259200000)
  }];


  const mockMessages = [
  {
    id: 1,
    content: "Hello! I need help understanding machine learning concepts.",
    type: 'text',
    isUser: true,
    timestamp: new Date(Date.now() - 600000),
    status: 'read',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17f90d383-1763293392637.png",
    avatarAlt: "Professional headshot of young man with short brown hair wearing blue shirt"
  },
  {
    id: 2,
    content: "Hello! I'd be happy to help you understand machine learning concepts. Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.\n\nThere are three main types:\n1. Supervised Learning - Learning from labeled data\n2. Unsupervised Learning - Finding patterns in unlabeled data\n3. Reinforcement Learning - Learning through trial and error\n\nWhich aspect would you like to explore further?",
    type: 'text',
    isUser: false,
    timestamp: new Date(Date.now() - 580000),
    status: 'sent'
  },
  {
    id: 3,
    content: "Can you explain supervised learning with an example?",
    type: 'text',
    isUser: true,
    timestamp: new Date(Date.now() - 560000),
    status: 'read',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17f90d383-1763293392637.png",
    avatarAlt: "Professional headshot of young man with short brown hair wearing blue shirt"
  },
  {
    id: 4,
    content: "Certainly! Supervised learning uses labeled training data to learn the relationship between inputs and outputs.\n\nExample: Email Spam Detection\n- Input: Email content and metadata\n- Labels: 'Spam' or 'Not Spam'\n- Process: The algorithm learns patterns from thousands of labeled emails\n- Result: Can classify new emails as spam or not spam\n\nHere's a simple Python example:",
    type: 'text',
    isUser: false,
    timestamp: new Date(Date.now() - 540000),
    status: 'sent'
  },
  {
    id: 5,
    content: `from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# Training data
emails = ['Buy now!', 'Meeting at 3pm', 'Win free prize', 'Project update']
labels = ['spam', 'not spam', 'spam', 'not spam']

# Create and train model
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(emails)
model = MultinomialNB()
model.fit(X, labels)

# Predict new email
new_email = vectorizer.transform(['Free money now'])
prediction = model.predict(new_email)
print(prediction)  # Output: ['spam']`,
    type: 'code',
    isUser: false,
    timestamp: new Date(Date.now() - 520000),
    status: 'sent'
  }];


  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages?.length + 1,
      content,
      type: 'text',
      isUser: true,
      timestamp: new Date(),
      status: 'sent',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17f90d383-1763293392637.png",
      avatarAlt: "Professional headshot of young man with short brown hair wearing blue shirt"
    };

    setMessages([...messages, newMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages?.length + 2,
        content: "I understand your question. Let me provide you with a detailed response based on the latest information and best practices. This is a simulated AI response that demonstrates the chat interface functionality.",
        type: 'text',
        isUser: false,
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (file) => {
    const fileMessage = {
      id: messages?.length + 1,
      content: URL.createObjectURL(file),
      type: 'file',
      fileName: file?.name,
      fileSize: `${(file?.size / 1024)?.toFixed(2)} KB`,
      isUser: true,
      timestamp: new Date(),
      status: 'sent',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17f90d383-1763293392637.png",
      avatarAlt: "Professional headshot of young man with short brown hair wearing blue shirt"
    };

    setMessages([...messages, fileMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages?.length + 2,
        content: `I've received your file "${file?.name}". I'm analyzing the content now. This is a simulated response demonstrating file upload functionality.`,
        type: 'text',
        isUser: false,
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2500);
  };

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    setMessages(mockMessages);
  };

  const handleStartConversation = (starter) => {
    handleSendMessage(starter);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader
        userName="John Smith"
        userEmail="john.smith@example.com"
        userRole="user" />

      <div className="main-content with-bottom-nav flex">
        <ConversationSidebar
          conversations={mockConversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)} />


        <div className="flex-1 flex flex-col h-[calc(100vh-60px)] lg:h-[calc(100vh-60px)]">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus-ring"
                aria-label="Open conversations">

                <Icon name="Menu" size={20} />
              </button>
              <div>
                <h2 className="text-base md:text-lg font-semibold text-foreground">
                  {activeConversationId ?
                  mockConversations?.find((c) => c?.id === activeConversationId)?.title :
                  'New Conversation'}
                </h2>
                <p className="text-xs md:text-sm caption text-muted-foreground">
                  AI-powered assistance
                </p>
              </div>
            </div>
            <ConnectionStatus className="hidden md:flex" />
          </div>

          {messages?.length === 0 ?
          <WelcomeScreen onStartConversation={handleStartConversation} /> :

          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                {messages?.map((message) =>
              <MessageBubble
                key={message?.id}
                message={message}
                isUser={message?.isUser} />

              )}
                {isTyping &&
              <div className="flex gap-3 mb-6">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Bot" size={16} color="var(--color-primary)" />
                    </div>
                    <TypingIndicator />
                  </div>
              }
                <div ref={messagesEndRef} />
              </div>
            </div>
          }

          <MessageInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            disabled={isTyping} />

        </div>
      </div>
      <BottomNavigation userRole="user" />
    </div>);

};

export default ChatInterface;