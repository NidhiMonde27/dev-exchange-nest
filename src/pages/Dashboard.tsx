import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Star, 
  MessageCircle,
  ArrowRight,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock data for demonstrations
  const upcomingSessions = [
    {
      id: '1',
      partner: {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        skill: 'Python'
      },
      skill: 'React',
      date: '2024-01-25',
      time: '14:00',
      type: 'learning'
    },
    {
      id: '2',
      partner: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        skill: 'Node.js'
      },
      skill: 'TypeScript',
      date: '2024-01-26',
      time: '10:00',
      type: 'teaching'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'completed',
      description: 'Completed Python basics session with Alex Kim',
      time: '2 hours ago',
      rating: 5
    },
    {
      id: '2',
      type: 'matched',
      description: 'New match found for Docker learning',
      time: '1 day ago'
    },
    {
      id: '3',
      type: 'review',
      description: 'Received 5-star review for React teaching',
      time: '2 days ago',
      rating: 5
    }
  ];

  const learningGoals = [
    {
      skill: 'Python',
      progress: 65,
      sessionsCompleted: 8,
      totalSessions: 12
    },
    {
      skill: 'Machine Learning',
      progress: 30,
      sessionsCompleted: 3,
      totalSessions: 10
    },
    {
      skill: 'Docker',
      progress: 15,
      sessionsCompleted: 1,
      totalSessions: 8
    }
  ];

  const stats = [
    {
      title: 'Sessions Completed',
      value: user.completedSessions,
      icon: <Calendar className="h-4 w-4" />,
      trend: '+12% this month'
    },
    {
      title: 'Skills Learned',
      value: '3',
      icon: <BookOpen className="h-4 w-4" />,
      trend: 'New: Docker'
    },
    {
      title: 'Skills Taught',
      value: user.skillsOffered.length,
      icon: <Users className="h-4 w-4" />,
      trend: 'Most popular: React'
    },
    {
      title: 'Rating',
      value: user.rating.toFixed(1),
      icon: <Star className="h-4 w-4" />,
      trend: 'Based on 15 reviews'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your skill exchange journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="border-0 shadow-soft animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                  </div>
                  <div className="p-3 bg-gradient-primary rounded-lg text-white">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Sessions
                    </CardTitle>
                    <CardDescription>Your scheduled learning and teaching sessions</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/sessions')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.partner.avatar} alt={session.partner.name} />
                      <AvatarFallback>{session.partner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium">{session.partner.name}</p>
                        <Badge variant={session.type === 'learning' ? 'default' : 'secondary'}>
                          {session.type === 'learning' ? 'Learning' : 'Teaching'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.type === 'learning' ? 'Learn' : 'Teach'} {session.skill} • {session.date} at {session.time}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {upcomingSessions.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No upcoming sessions scheduled</p>
                    <Button onClick={() => navigate('/matches')}>
                      Find Learning Partners
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Track your progress toward mastering new skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {learningGoals.map((goal) => (
                  <div key={goal.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{goal.skill}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {goal.sessionsCompleted}/{goal.totalSessions} sessions
                        </span>
                      </div>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-gradient-primary hover:opacity-90 text-white border-0"
                  onClick={() => navigate('/matches')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Find New Matches
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/chat')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open Messages
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/profile')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        {activity.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="border-0 shadow-soft bg-gradient-secondary text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Great Progress!</h3>
                    <p className="text-sm opacity-90">
                      You've completed {user.completedSessions} sessions this month. Keep it up!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;