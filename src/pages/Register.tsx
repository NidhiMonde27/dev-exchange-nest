import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Code2, Mail, Lock, User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [currentSkillOffered, setCurrentSkillOffered] = useState('');
  const [currentSkillWanted, setCurrentSkillWanted] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const popularSkills = [
    'React', 'Python', 'JavaScript', 'TypeScript', 'Node.js', 'Docker', 
    'Kubernetes', 'AWS', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Vue.js',
    'Angular', 'Machine Learning', 'Data Science', 'Flutter', 'React Native'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addSkillOffered = () => {
    if (currentSkillOffered.trim() && !skillsOffered.includes(currentSkillOffered.trim())) {
      setSkillsOffered(prev => [...prev, currentSkillOffered.trim()]);
      setCurrentSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (currentSkillWanted.trim() && !skillsWanted.includes(currentSkillWanted.trim())) {
      setSkillsWanted(prev => [...prev, currentSkillWanted.trim()]);
      setCurrentSkillWanted('');
    }
  };

  const removeSkillOffered = (skill: string) => {
    setSkillsOffered(prev => prev.filter(s => s !== skill));
  };

  const removeSkillWanted = (skill: string) => {
    setSkillsWanted(prev => prev.filter(s => s !== skill));
  };

  const addPopularSkill = (skill: string, type: 'offered' | 'wanted') => {
    if (type === 'offered' && !skillsOffered.includes(skill)) {
      setSkillsOffered(prev => [...prev, skill]);
    } else if (type === 'wanted' && !skillsWanted.includes(skill)) {
      setSkillsWanted(prev => [...prev, skill]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (skillsOffered.length === 0) {
      setError('Please add at least one skill you can offer');
      return;
    }

    if (skillsWanted.length === 0) {
      setError('Please add at least one skill you want to learn');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        skillsOffered,
        skillsWanted
      });
      
      toast({
        title: "Welcome to SkillSwap!",
        description: "Your account has been created successfully.",
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4 py-8">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Code2 className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">SkillSwap</span>
          </div>
        </div>

        <Card className="border-0 shadow-strong">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Join SkillSwap</CardTitle>
            <CardDescription>
              Create your account and start exchanging coding skills
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-slide-up">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Skills I Can Offer */}
              <div className="space-y-3">
                <Label>Skills I Can Teach</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill you can teach"
                    value={currentSkillOffered}
                    onChange={(e) => setCurrentSkillOffered(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffered())}
                    disabled={isLoading}
                  />
                  <Button 
                    type="button" 
                    onClick={addSkillOffered}
                    variant="outline"
                    disabled={isLoading}
                  >
                    Add
                  </Button>
                </div>
                
                {skillsOffered.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skillsOffered.map(skill => (
                      <Badge key={skill} className="bg-success text-success-foreground">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkillOffered(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Popular skills you can teach:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map(skill => (
                      <Badge 
                        key={skill}
                        variant="outline"
                        className="cursor-pointer hover:bg-success hover:text-success-foreground transition-colors"
                        onClick={() => addPopularSkill(skill, 'offered')}
                      >
                        + {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills I Want to Learn */}
              <div className="space-y-3">
                <Label>Skills I Want to Learn</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill you want to learn"
                    value={currentSkillWanted}
                    onChange={(e) => setCurrentSkillWanted(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillWanted())}
                    disabled={isLoading}
                  />
                  <Button 
                    type="button" 
                    onClick={addSkillWanted}
                    variant="outline"
                    disabled={isLoading}
                  >
                    Add
                  </Button>
                </div>
                
                {skillsWanted.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skillsWanted.map(skill => (
                      <Badge key={skill} className="bg-primary text-primary-foreground">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkillWanted(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Popular skills to learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map(skill => (
                      <Badge 
                        key={skill}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => addPopularSkill(skill, 'wanted')}
                      >
                        + {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 text-white border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="text-sm text-center">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;