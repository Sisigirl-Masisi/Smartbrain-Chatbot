import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageAnalyticsSection = ({ analyticsData }) => {
  const StatCard = ({ icon, label, value, trend, trendDirection }) => (
    <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendDirection === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
            <Icon name={trendDirection === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h4 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
        {value}
      </h4>
      <p className="text-sm text-muted-foreground caption">{label}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          Usage Analytics
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Track your conversation statistics and API usage
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          icon="MessageSquare"
          label="Total Conversations"
          value={analyticsData?.totalConversations}
          trend="+12%"
          trendDirection="up"
        />
        <StatCard
          icon="Send"
          label="Messages Sent"
          value={analyticsData?.messagesSent}
          trend="+8%"
          trendDirection="up"
        />
        <StatCard
          icon="Clock"
          label="Avg Response Time"
          value={analyticsData?.avgResponseTime}
          trend="-5%"
          trendDirection="down"
        />
        <StatCard
          icon="Zap"
          label="API Calls This Month"
          value={analyticsData?.apiCalls}
        />
        <StatCard
          icon="Database"
          label="Data Usage"
          value={analyticsData?.dataUsage}
        />
        <StatCard
          icon="Star"
          label="Satisfaction Rate"
          value={analyticsData?.satisfactionRate}
          trend="+3%"
          trendDirection="up"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pt-4">
        <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Most Active Days
          </h4>
          <div className="space-y-3">
            {analyticsData?.mostActiveDays?.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{day?.day}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 md:w-48 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${day?.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {day?.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Tag" size={20} />
            Top Topics
          </h4>
          <div className="space-y-3">
            {analyticsData?.topTopics?.map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{topic?.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 md:w-48 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary rounded-full"
                      style={{ width: `${topic?.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {topic?.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {analyticsData?.subscription && (
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 md:p-6 border border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Icon name="Crown" size={24} className="text-primary mt-1" />
              <div>
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  {analyticsData?.subscription?.plan} Plan
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {analyticsData?.subscription?.apiLimit} API calls per month
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-48 md:w-64 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(analyticsData?.apiCalls / analyticsData?.subscription?.apiLimit) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground caption whitespace-nowrap">
                    {analyticsData?.apiCalls} / {analyticsData?.subscription?.apiLimit}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm text-muted-foreground mb-1">Next billing date</p>
              <p className="text-base font-semibold text-foreground">
                {analyticsData?.subscription?.nextBilling}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageAnalyticsSection;