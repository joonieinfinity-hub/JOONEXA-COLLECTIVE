import { Project, ProjectCategory } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    brandName: 'Café Lumière',
    projectName: 'Website Redesign for Café Lumière',
    category: ProjectCategory.WEB_DESIGN,
    serviceType: 'Web Design & Development',
    description: 'A complete digital overhaul for a boutique French café, focusing on high-end visuals and seamless reservation flow.',
    result: '+42% reservations',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
    slug: 'cafe-lumiere-redesign',
    caseStudy: {
      overview: {
        industry: 'Hospitality',
        services: ['Web Design', 'UI/UX Strategy', 'SEO Optimization'],
      },
      problem: 'Café Lumière had a dated website that didn\'t reflect their premium atmosphere, leading to low online engagement and a high bounce rate on their reservation page.',
      strategy: 'We focused on "Digital Elegance" – using high-resolution lifestyle photography, a minimalist layout, and a simplified 3-click reservation system.',
      execution: [
        {
          title: 'Visual Identity',
          content: 'We captured the essence of the café through professional photography and a color palette inspired by Parisian mornings.',
          media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop', caption: 'New website homepage design' }
          ]
        },
        {
          title: 'Reservation Flow',
          content: 'Implemented a custom booking engine that reduced friction, resulting in a significant uplift in confirmed bookings.',
        }
      ],
      results: [
        { label: 'Online Reservations', value: '+42%', icon: 'Calendar' },
        { label: 'Mobile Traffic', value: '+65%', icon: 'Smartphone' },
        { label: 'Average Session Duration', value: '3m 45s', icon: 'Clock' }
      ]
    }
  },
  {
    id: '2',
    brandName: 'Aura Skincare',
    projectName: 'Aura Skincare Growth Strategy',
    category: ProjectCategory.MARKETING_CAMPAIGNS,
    serviceType: 'Marketing Strategy & Social Growth',
    description: 'Scaling a luxury skincare brand through targeted performance marketing and content strategy.',
    result: '3.2x Engagement',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop',
    slug: 'aura-skincare-growth',
    caseStudy: {
      overview: {
        industry: 'Beauty & Wellness',
        services: ['Performance Marketing', 'Content Strategy', 'Email Automation'],
      },
      problem: 'Aura had a great product but struggled to reach their target demographic effectively, resulting in high CAC and low repeat purchase rates.',
      strategy: 'We implemented a multi-channel funnel focusing on educational content and retargeting high-intent users.',
      execution: [
        {
          title: 'Social Media Campaign',
          content: 'Created a series of "Science of Glow" videos that educated users on ingredients while showcasing the product.',
          media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop', caption: 'Campaign visual for Instagram' }
          ]
        }
      ],
      results: [
        { label: 'Engagement Growth', value: '3.2x', icon: 'TrendingUp' },
        { label: 'Customer Acquisition Cost', value: '-25%', icon: 'DollarSign' },
        { label: 'Return on Ad Spend', value: '4.5x', icon: 'BarChart' }
      ]
    }
  },
  {
    id: '3',
    brandName: 'Velo Tech',
    projectName: 'Velo Tech Influencer Launch',
    category: ProjectCategory.INFLUENCER_CAMPAIGNS,
    serviceType: 'Influencer Marketing',
    description: 'Launching a new tech gadget through a network of 50+ micro-influencers in the productivity space.',
    result: '+220% Reach',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    slug: 'velo-tech-influencer-launch',
    caseStudy: {
      overview: {
        industry: 'Consumer Electronics',
        services: ['Influencer Sourcing', 'Campaign Management', 'Content Creation'],
      },
      problem: 'Velo Tech needed to build immediate trust and awareness for their new productivity tool in a crowded market.',
      strategy: 'Leveraged authentic creators who actually use productivity tools, focusing on "Day in the Life" integrations.',
      execution: [
        {
          title: 'Creator Selection',
          content: 'Vetted over 500 creators to find the perfect 50 who aligned with the brand\'s minimalist aesthetic.',
        }
      ],
      results: [
        { label: 'Total Reach', value: '2.5M+', icon: 'Users' },
        { label: 'Organic Mentions', value: '+220%', icon: 'Share2' },
        { label: 'Conversion Rate', value: '3.8%', icon: 'Target' }
      ]
    }
  }
];
