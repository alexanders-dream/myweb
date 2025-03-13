
import { Lightbulb, Zap, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden relative">
      <div className="absolute inset-0 noise-bg opacity-50 pointer-events-none"></div>
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              About Alexander Oguso
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Leading Digital Innovation 
              <span className="block mt-2 gradient-text from-indigo-600 via-purple-600 to-indigo-600">
                For Tomorrow's Challenges
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              I help businesses navigate the complexities of digital transformation, leveraging cutting-edge technologies to create sustainable competitive advantages in an increasingly digital world.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              With expertise spanning AI, XR, and multimedia content creation, I partner with forward-thinking organizations to implement innovative solutions that drive growth, efficiency, and superior customer experiences.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Innovative Solutions</h3>
                  <p className="text-muted-foreground text-sm">Creating tailored digital strategies for unique business challenges</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Agile Approach</h3>
                  <p className="text-muted-foreground text-sm">Adapting quickly to evolving technologies and market demands</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Future-Proof</h3>
                  <p className="text-muted-foreground text-sm">Building scalable solutions with long-term value</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Collaborative</h3>
                  <p className="text-muted-foreground text-sm">Working closely with clients to ensure successful implementation</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-purple-600/20 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop" 
                alt="Digital transformation workspace" 
                className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Stats */}
            <div className="absolute -bottom-6 -left-6 lg:-left-10 glass-panel rounded-xl p-6 shadow-xl max-w-xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium">Digital Transformation</h4>
                <span className="text-xs text-muted-foreground">Last 5 years</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Projects Completed</span>
                    <span className="font-medium">50+</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Client Satisfaction</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ROI Generated</span>
                    <span className="font-medium">250M+</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
