
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  slug: string;
}

const blogPosts: Record<string, BlogPost> = {
  'future-ai-business-transformation': {
    id: '1',
    title: 'The Future of AI in Business Transformation',
    content: `
      <p>Artificial intelligence (AI) is no longer just a buzzword—it's transforming how businesses operate at every level. From automating routine tasks to providing deep insights from complex data, AI is helping organizations become more efficient, innovative, and customer-centric.</p>
      
      <h2>Strategic Decision Making</h2>
      <p>One of the most powerful applications of AI in business is its ability to enhance decision-making processes. By analyzing vast amounts of data and identifying patterns that might be invisible to human analysts, AI systems can provide recommendations that lead to better strategic choices.</p>
      
      <h2>Customer Experience Enhancement</h2>
      <p>AI-powered chatbots and virtual assistants are revolutionizing customer service by providing instant, personalized responses to queries. These systems learn from each interaction, continuously improving their ability to address customer needs effectively.</p>
      
      <h2>Operational Efficiency</h2>
      <p>In operations, AI is streamlining processes through predictive maintenance, inventory optimization, and quality control. By anticipating equipment failures before they occur or automatically adjusting inventory levels based on demand forecasts, businesses can reduce costs and minimize disruptions.</p>
      
      <h2>The Road Ahead</h2>
      <p>Looking to the future, AI will likely become even more deeply integrated into business operations. As natural language processing, computer vision, and machine learning technologies continue to advance, we can expect AI systems to take on increasingly complex tasks and collaborate more seamlessly with human workers.</p>
      
      <p>Organizations that embrace AI as a core component of their digital transformation strategy will be well-positioned to thrive in the rapidly evolving business landscape.</p>
    `,
    date: 'June 15, 2023',
    author: 'Alexander Oguso',
    readTime: '5 min read',
    slug: 'future-ai-business-transformation'
  },
  'extended-reality-beyond-hype': {
    id: '2',
    title: 'Extended Reality: Beyond the Hype',
    content: `
      <p>Extended Reality (XR)—which encompasses virtual reality (VR), augmented reality (AR), and mixed reality (MR)—has generated considerable excitement in recent years. But beyond the flashy demos and futuristic promises, how is XR actually creating value for businesses today?</p>
      
      <h2>Training and Skill Development</h2>
      <p>One of the most mature applications of XR is in training and education. VR simulations allow employees to practice complex procedures in a safe, controlled environment, from surgical techniques to equipment maintenance. The immersive nature of these experiences leads to better knowledge retention and skill development.</p>
      
      <h2>Design and Prototyping</h2>
      <p>In manufacturing and product design, XR technologies are streamlining the development process. Engineers and designers can collaborate on virtual prototypes, making adjustments in real-time and visualizing products before physical production begins, saving time and resources.</p>
      
      <h2>Customer Engagement</h2>
      <p>Retailers are using AR to enhance the shopping experience, allowing customers to visualize products in their own spaces before making a purchase. From furniture placement to virtual try-ons for clothing and accessories, these applications are reducing return rates and increasing customer satisfaction.</p>
      
      <h2>Remote Collaboration</h2>
      <p>With the rise of distributed workforces, XR is providing new ways for teams to collaborate effectively regardless of physical location. Virtual meeting spaces allow for more engaging and productive interactions than traditional video conferencing.</p>
      
      <p>While some XR applications still face challenges related to hardware limitations and user adoption, the technology is increasingly proving its worth in specific, high-value use cases across industries.</p>
    `,
    date: 'July 22, 2023',
    author: 'Alexander Oguso',
    readTime: '7 min read',
    slug: 'extended-reality-beyond-hype'
  },
  'digital-transformation-success-stories': {
    id: '3',
    title: 'Digital Transformation Success Stories',
    content: `<p>This is a placeholder for the content of this blog post.</p>`,
    date: 'August 10, 2023',
    author: 'Alexander Oguso',
    readTime: '8 min read',
    slug: 'digital-transformation-success-stories'
  },
  'emerging-tech-trends-2024': {
    id: '4',
    title: 'Emerging Tech Trends for 2024',
    content: `<p>This is a placeholder for the content of this blog post.</p>`,
    date: 'September 5, 2023',
    author: 'Alexander Oguso',
    readTime: '6 min read',
    slug: 'emerging-tech-trends-2024'
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex flex-col w-full bg-background noise-bg">
          <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-2xl mx-auto">
                <Button variant="ghost" size="sm" asChild className="mb-6">
                  <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
                </Button>
                <div className="text-center p-12">
                  <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
                  <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has been removed.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background noise-bg">
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl mx-auto">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
              </Button>
              
              <article>
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BlogPost;
