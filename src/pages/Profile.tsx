import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Mail, 
  Calendar, 
  Star, 
  Edit, 
  Save, 
  X, 
  Plus,
  Award,
  BookOpen,
  Users,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    skillsOffered: user?.skillsOffered || [],
    skillsWanted: user?.skillsWanted || []
  });
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  if (!user) return null;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio || '',
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted
    });
    setIsEditing(false);
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim() && !formData.skillsOffered.includes(newSkillOffered.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim() && !formData.skillsWanted.includes(newSkillWanted.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted('');
    }
  };

  const removeSkillOffered = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter(s => s !== skill)
    }));
  };

  const removeSkillWanted = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter(s => s !== skill)
    }));
  };

  // Mock data for reviews and sessions
  const reviews = [
    {
      id: '1',
      reviewer: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      skill: 'React',
      rating: 5,
      comment: 'Excellent teacher! Very patient and knowledgeable. Learned a lot about React hooks.',
      date: '2024-01-20'
    },
    {
      id: '2',
      reviewer: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      skill: 'TypeScript',
      rating: 5,
      comment: 'Great session on TypeScript fundamentals. Clear explanations and practical examples.',
      date: '2024-01-18'
    }
  ];

  const completedSessions = [
    {
      id: '1',
      partner: 'Alex Kim',
      skill: 'Python',
      type: 'learning',
      date: '2024-01-22',
      rating: 4
    },
    {
      id: '2',
      partner: 'Sarah Wilson',
      skill: 'React',
      type: 'teaching',
      date: '2024-01-20',
      rating: 5
    },
    {
      id: '3',
      partner: 'Mike Chen',
      skill: 'TypeScript',
      type: 'teaching',
      date: '2024-01-18',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Profile</h1>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="bg-gradient-primary hover:opacity-90 text-white border-0">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleCancel} variant="outline">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90 text-white border-0">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="lg:col-span-1 border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Avatar className="h-24 w-24 mx-auto">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-lg bg-gradient-primary text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      {isEditing ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="text-center"
                        />
                      ) : (
                        <h2 className="text-xl font-bold">{user.name}</h2>
                      )}
                      
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{user.rating}</span>
                        <span className="text-muted-foreground">({reviews.length} reviews)</span>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats and Bio */}
                <Card className="lg:col-span-2 border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-2xl font-bold">{user.completedSessions}</div>
                          <div className="text-sm text-muted-foreground">Sessions</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-2xl font-bold">{user.skillsOffered.length}</div>
                          <div className="text-sm text-muted-foreground">Skills Offered</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-2xl font-bold">{user.skillsWanted.length}</div>
                          <div className="text-sm text-muted-foreground">Learning Goals</div>
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <Label>About Me</Label>
                        {isEditing ? (
                          <Textarea
                            placeholder="Tell others about yourself, your experience, and what you're passionate about..."
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            rows={4}
                          />
                        ) : (
                          <p className="text-muted-foreground">
                            {user.bio || "No bio available. Edit your profile to add one!"}
                          </p>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2">
                        <Label>Contact Information</Label>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Skills I Offer */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-success">Skills I Can Teach</CardTitle>
                    <CardDescription>Technologies and skills you can help others learn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.skillsOffered.map(skill => (
                        <Badge key={skill} className="bg-success text-success-foreground">
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => removeSkillOffered(skill)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a skill you can teach"
                          value={newSkillOffered}
                          onChange={(e) => setNewSkillOffered(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffered())}
                        />
                        <Button onClick={addSkillOffered} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Skills I Want */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-primary">Skills I Want to Learn</CardTitle>
                    <CardDescription>Technologies and skills you'd like to master</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.skillsWanted.map(skill => (
                        <Badge key={skill} className="bg-primary text-primary-foreground">
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => removeSkillWanted(skill)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a skill you want to learn"
                          value={newSkillWanted}
                          onChange={(e) => setNewSkillWanted(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillWanted())}
                        />
                        <Button onClick={addSkillWanted} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-6">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Completed Sessions</CardTitle>
                  <CardDescription>Your learning and teaching session history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${session.type === 'learning' ? 'bg-primary/20' : 'bg-success/20'}`}>
                            {session.type === 'learning' ? 
                              <BookOpen className="h-4 w-4 text-primary" /> : 
                              <Users className="h-4 w-4 text-success" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">
                              {session.type === 'learning' ? 'Learned' : 'Taught'} {session.skill}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {session.type === 'learning' ? 'with' : 'to'} {session.partner} • {session.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(session.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle>Reviews & Feedback</CardTitle>
                  <CardDescription>What others say about your teaching</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} alt={review.reviewer} />
                            <AvatarFallback>{review.reviewer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">{review.reviewer}</p>
                                <p className="text-sm text-muted-foreground">
                                  {review.skill} session • {review.date}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;