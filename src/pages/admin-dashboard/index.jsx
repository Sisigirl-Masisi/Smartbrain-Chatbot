import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/NavigationHeader';
import BottomNavigation from '../../components/BottomNavigation';
import MetricCard from './components/MetricCard';
import SystemHealthPanel from './components/SystemHealthPanel';
import ConversationTable from './components/ConversationTable';
import PerformanceChart from './components/PerformanceChart';
import UserActivityLog from './components/UserActivityLog';
import AlertNotifications from './components/AlertNotifications';
import QuickActions from './components/QuickActions';

const AdminDashboard = () => {
  const [currentUser] = useState({
    role: 'admin',
    name: 'Admin User',
    email: 'admin@smartbrain.com'
  });

  const metricsData = [
  {
    id: 1,
    title: "Total Conversations",
    value: "12,847",
    change: "+12.5%",
    changeType: "positive",
    icon: "MessageSquare",
    iconColor: "bg-primary/10 text-primary",
    trend: true
  },
  {
    id: 2,
    title: "Response Accuracy",
    value: "94.2%",
    change: "+2.3%",
    changeType: "positive",
    icon: "Target",
    iconColor: "bg-success/10 text-success",
    trend: true
  },
  {
    id: 3,
    title: "Active Users",
    value: "3,421",
    change: "+8.1%",
    changeType: "positive",
    icon: "Users",
    iconColor: "bg-secondary/10 text-secondary",
    trend: true
  },
  {
    id: 4,
    title: "Avg Response Time",
    value: "1.2s",
    change: "-0.3s",
    changeType: "positive",
    icon: "Zap",
    iconColor: "bg-accent/10 text-accent",
    trend: true
  },
  {
    id: 5,
    title: "API Calls Today",
    value: "45,892",
    change: "+15.7%",
    changeType: "positive",
    icon: "Activity",
    iconColor: "bg-warning/10 text-warning",
    trend: true
  },
  {
    id: 6,
    title: "Error Rate",
    value: "0.8%",
    change: "-0.2%",
    changeType: "positive",
    icon: "AlertCircle",
    iconColor: "bg-error/10 text-error",
    trend: true
  }];


  const systemHealthData = [
  {
    id: 1,
    name: "API Server",
    description: "Main API endpoint status",
    value: "99.9%",
    unit: "uptime",
    status: "healthy"
  },
  {
    id: 2,
    name: "Database",
    description: "Database connection and performance",
    value: "45ms",
    unit: "latency",
    status: "healthy"
  },
  {
    id: 3,
    name: "AI Model",
    description: "AI processing engine status",
    value: "1.2s",
    unit: "avg response",
    status: "healthy"
  },
  {
    id: 4,
    name: "Rate Limiting",
    description: "API rate limit monitoring",
    value: "78%",
    unit: "capacity",
    status: "warning"
  }];


  const conversationsData = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18811c304-1763296452128.png",
    avatarAlt: "Professional headshot of woman with blonde hair in business attire smiling at camera",
    query: "How do I implement authentication in React?",
    timestamp: "2026-01-16 07:15:23",
    status: "completed"
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d016bf22-1763294444496.png",
    avatarAlt: "Professional headshot of Asian man with glasses in navy suit with confident expression",
    query: "What are the best practices for state management?",
    timestamp: "2026-01-16 07:10:45",
    status: "completed"
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_183808107-1763293582927.png",
    avatarAlt: "Professional headshot of Hispanic woman with dark hair in red blazer smiling warmly",
    query: "Can you explain React hooks in detail?",
    timestamp: "2026-01-16 07:05:12",
    status: "active"
  },
  {
    id: 4,
    user: "David Kim",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0d320ce-1763293583041.png",
    avatarAlt: "Professional headshot of young Asian man in casual blue shirt with friendly smile",
    query: "How to optimize React performance?",
    timestamp: "2026-01-16 06:58:34",
    status: "completed"
  },
  {
    id: 5,
    user: "Jessica Martinez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1691a8840-1763294659276.png",
    avatarAlt: "Professional headshot of woman with curly brown hair in green blouse with warm expression",
    query: "What is the difference between useEffect and useLayoutEffect?",
    timestamp: "2026-01-16 06:52:18",
    status: "error"
  },
  {
    id: 6,
    user: "Robert Taylor",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a3897225-1763292675321.png",
    avatarAlt: "Professional headshot of middle-aged man with gray hair in charcoal suit with serious expression",
    query: "How to handle forms in React?",
    timestamp: "2026-01-16 06:45:29",
    status: "completed"
  },
  {
    id: 7,
    user: "Amanda White",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e73c7f02-1763296884340.png",
    avatarAlt: "Professional headshot of young woman with red hair in white blouse smiling brightly",
    query: "What are React portals and when to use them?",
    timestamp: "2026-01-16 06:38:56",
    status: "completed"
  },
  {
    id: 8,
    user: "James Wilson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19cb6316f-1763296145823.png",
    avatarAlt: "Professional headshot of African American man in dark suit with confident smile",
    query: "How to implement routing in React applications?",
    timestamp: "2026-01-16 06:32:41",
    status: "completed"
  },
  {
    id: 9,
    user: "Lisa Anderson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11d3d0963-1763301286135.png",
    avatarAlt: "Professional headshot of woman with short black hair in purple blazer with professional demeanor",
    query: "What is React Context API?",
    timestamp: "2026-01-16 06:25:17",
    status: "active"
  },
  {
    id: 10,
    user: "Christopher Lee",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14d76676c-1763296489595.png",
    avatarAlt: "Professional headshot of young man with brown hair in gray sweater with friendly expression",
    query: "How to test React components?",
    timestamp: "2026-01-16 06:18:52",
    status: "completed"
  }];


  const chartData = [
  { name: 'Mon', conversations: 1240, responses: 1180 },
  { name: 'Tue', conversations: 1580, responses: 1520 },
  { name: 'Wed', conversations: 1890, responses: 1850 },
  { name: 'Thu', conversations: 2100, responses: 2050 },
  { name: 'Fri', conversations: 2340, responses: 2280 },
  { name: 'Sat', conversations: 1950, responses: 1890 },
  { name: 'Sun', conversations: 1747, responses: 1680 }];


  const activityLogData = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18811c304-1763296452128.png",
    avatarAlt: "Professional headshot of woman with blonde hair in business attire smiling at camera",
    type: "login",
    description: "User logged in successfully",
    timestamp: "2 minutes ago",
    metadata: {
      ip: "192.168.1.45",
      location: "New York, USA"
    }
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d016bf22-1763294444496.png",
    avatarAlt: "Professional headshot of Asian man with glasses in navy suit with confident expression",
    type: "query",
    description: "Submitted query about React state management",
    timestamp: "5 minutes ago",
    metadata: {
      ip: "192.168.1.78",
      location: "San Francisco, USA"
    }
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_183808107-1763293582927.png",
    avatarAlt: "Professional headshot of Hispanic woman with dark hair in red blazer smiling warmly",
    type: "error",
    description: "API timeout error occurred during query processing",
    timestamp: "8 minutes ago",
    metadata: {
      ip: "192.168.1.92",
      location: "Miami, USA"
    }
  },
  {
    id: 4,
    user: "David Kim",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0d320ce-1763293583041.png",
    avatarAlt: "Professional headshot of young Asian man in casual blue shirt with friendly smile",
    type: "query",
    description: "Completed conversation about React hooks",
    timestamp: "12 minutes ago",
    metadata: {
      ip: "192.168.1.56",
      location: "Seattle, USA"
    }
  },
  {
    id: 5,
    user: "Jessica Martinez",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1691a8840-1763294659276.png",
    avatarAlt: "Professional headshot of woman with curly brown hair in green blouse with warm expression",
    type: "logout",
    description: "User logged out",
    timestamp: "15 minutes ago",
    metadata: {
      ip: "192.168.1.34",
      location: "Austin, USA"
    }
  }];


  const alertsData = [
  {
    id: 1,
    priority: "critical",
    title: "High API Error Rate Detected",
    message: "API error rate has exceeded 5% threshold in the last 15 minutes. Immediate attention required.",
    timestamp: "5 minutes ago"
  },
  {
    id: 2,
    priority: "high",
    title: "Database Connection Pool Warning",
    message: "Database connection pool is at 85% capacity. Consider scaling resources.",
    timestamp: "12 minutes ago"
  },
  {
    id: 3,
    priority: "medium",
    title: "Scheduled Maintenance Reminder",
    message: "System maintenance scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.",
    timestamp: "1 hour ago"
  }];


  useEffect(() => {
    document.title = "Admin Dashboard - SmartBrain";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader
        userRole={currentUser?.role}
        userName={currentUser?.name}
        userEmail={currentUser?.email} />

      <main className="main-content with-bottom-nav">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Monitor system performance and manage chatbot operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {metricsData?.map((metric) =>
            <MetricCard key={metric?.id} {...metric} />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <PerformanceChart
                data={chartData}
                title="Conversation Analytics"
                type="line" />

            </div>
            <div>
              <SystemHealthPanel healthData={systemHealthData} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <AlertNotifications alerts={alertsData} />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <ConversationTable conversations={conversationsData} />
            </div>
            <div>
              <UserActivityLog activities={activityLogData} />
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation userRole={currentUser?.role} />
    </div>);

};

export default AdminDashboard;