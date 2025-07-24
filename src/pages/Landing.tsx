import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Users, 
  MessageCircle, 
  Star, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  Play
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Smart Matching",
      description: "Our AI algorithm connects you with developers who have the skills you want to learn and need the skills you offer."
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "In-App Chat",
      description: "Communicate seamlessly with your skill partners through our built-in messaging system."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Resource Sharing",
      description: "Exchange code snippets, documentation, tutorials, and project files with ease."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Rating System",
      description: "Build trust in the community with our transparent rating and review system."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey and celebrate milestones with detailed analytics."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safe Environment",
      description: "Learn in a supportive community with verified profiles and moderated interactions."
    }
  ];

  const skills = [
    "React", "Python", "JavaScript", "TypeScript", "Node.js", "Docker", 
    "Kubernetes", "GraphQL", "MongoDB", "PostgreSQL", "AWS", "Machine Learning",
    "Data Science", "Go", "Rust", "Flutter", "React Native", "Vue.js"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      content: "SkillSwap helped me transition from frontend to full-stack development. The mentor I found was incredible!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Backend Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      content: "I've learned Python and Machine Learning through SkillSwap while teaching React. It's a win-win!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      content: "The quality of developers on this platform is outstanding. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-primary-light text-primary-dark border-0">
                  🚀 Join 10,000+ developers learning together
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Learn. Teach. 
                  <span className="text-gradient block">Grow Together.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Connect with fellow developers to exchange coding skills. Master new technologies while sharing your expertise.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-primary hover:opacity-90 text-white border-0 shadow-medium group"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary/20 hover:bg-primary/5"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Safe & secure</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-float"></div>
              <img 
                src={heroImage} 
                alt="Developers collaborating and learning together" 
                className="relative rounded-3xl shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Popular Skills on SkillSwap</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what technologies our community is teaching and learning
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Everything you need to succeed</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform provides all the tools and features you need for effective skill exchange
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">How SkillSwap Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "List the skills you want to learn and the skills you can teach. Upload your portfolio and set your preferences."
              },
              {
                step: "02", 
                title: "Get Matched",
                description: "Our smart algorithm finds the perfect skill exchange partners based on your profile and learning goals."
              },
              {
                step: "03",
                title: "Start Learning",
                description: "Connect with your matches, schedule sessions, and start exchanging knowledge through our platform."
              }
            ].map((step, index) => (
              <div 
                key={step.step} 
                className="text-center space-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold shadow-medium">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">What developers are saying</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of developers who've accelerated their careers through SkillSwap
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to accelerate your coding journey?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join SkillSwap today and connect with developers who can help you learn new skills while you share your expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/register')}
                className="bg-white text-primary hover:bg-gray-100 shadow-medium"
              >
                Join SkillSwap Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/20 text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;