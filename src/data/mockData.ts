
export const mockDashboardData = {
  analyticsSummary: {
    widgetTitle: "Today's Performance Overview",
    totalUsers: 12345,
    newSignupsToday: 78,
    activeUsers: 5678,
    revenueToday: "$12,450",
    conversionRate: "4.2%",
    growth: {
      users: 12.5,
      revenue: 8.7,
      conversion: -2.1
    },
    recentActivities: [
      {
        id: "act1",
        type: "New User",
        description: "User 'JohnDoe' signed up.",
        timestamp: "2025-06-24T09:30:00Z"
      },
      {
        id: "act2",
        type: "Transaction",
        description: "Sale of Pro Plan to 'Acme Corp'.",
        timestamp: "2025-06-24T09:15:00Z"
      },
      {
        id: "act3",
        type: "Login",
        description: "User 'JaneSmith' logged in.",
        timestamp: "2025-06-24T08:50:00Z"
      },
      {
        id: "act4",
        type: "Update",
        description: "Dashboard settings updated by 'AdminUser'.",
        timestamp: "2025-06-24T08:20:00Z"
      }
    ]
  },
  chartData: [
    { month: 'Jan', users: 4000, revenue: 2400 },
    { month: 'Feb', users: 3000, revenue: 1398 },
    { month: 'Mar', users: 2000, revenue: 9800 },
    { month: 'Apr', users: 2780, revenue: 3908 },
    { month: 'May', users: 1890, revenue: 4800 },
    { month: 'Jun', users: 2390, revenue: 3800 }
  ],
  notifications: [
    {
      id: "notif1",
      type: "warning" as const,
      title: "Trial Ending Soon",
      message: "Your free trial ends in 3 days!",
      timestamp: "2024-06-27T10:30:00Z",
      read: false,
      severity: "high"
    },
    {
      id: "notif2",
      type: "info" as const,
      title: "New Feature Available",
      message: "New feature: Advanced Reporting is now available.",
      timestamp: "2024-06-27T09:15:00Z",
      read: true,
      severity: "info"
    }
  ],
  recentActivity: [
    {
      id: 1,
      user: 'JohnDoe',
      action: 'signed up',
      timestamp: '2025-06-24T09:30:00Z'
    },
    {
      id: 2,
      user: 'Acme Corp',
      action: 'purchased Pro Plan',
      timestamp: '2025-06-24T09:15:00Z'
    },
    {
      id: 3,
      user: 'JaneSmith',
      action: 'logged in',
      timestamp: '2025-06-24T08:50:00Z'
    }
  ]
};

// Simulate API delay with configurable latency
export const fetchDashboardData = (latencyMs: number = 2000): Promise<typeof mockDashboardData> => {
  return new Promise((resolve, reject) => {
    console.log(`Simulating API call with ${latencyMs}ms latency...`);
    
    setTimeout(() => {
      // Simulate occasional network errors (5% chance)
      if (Math.random() < 0.05) {
        console.error('Simulated network error');
        reject(new Error('Network request failed'));
        return;
      }
      
      console.log('API call completed successfully');
      resolve(mockDashboardData);
    }, latencyMs);
  });
};
