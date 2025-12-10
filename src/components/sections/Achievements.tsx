import { motion } from 'framer-motion';
import { Trophy, Calendar, Award, Medal, TrendingUp } from 'lucide-react';
import { memo } from 'react';
import GradientText from '../ui/GradientText';

interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  highlights: string[];
  icon: 'trophy' | 'award' | 'medal' | 'trending';
}

const achievements: Achievement[] = [
  {
    title: '1st Place — Road Accident Prediction Model',
    organization: 'IBM SkillsBuild Data Analytics Internship, CSRBOX',
    date: 'June 2024 - August 2024',
    description: 'Achieved 1st place out of 123 teams (29,347 students) in a national-level challenge to develop a Road Accident Prediction Model for Safer Urban Transportation.',
    highlights: [
      'Analyzed crash incident data correlating weather, time, and road characteristics',
      'Collaborated with 4 students to map high-risk areas using ML',
    ],
    icon: 'trophy',
  },
  {
    title: '2nd Place — SwiftBytes (Envisage)',
    organization: 'Muffakham Jah College of Engineering and Technology',
    date: 'July 2025',
    description: 'Secured 2nd place for SwiftBytes, a full-stack web application facilitating takeaway services for canteens and restaurants.',
    highlights: [
      'Deployed backend on Render using Node.js/Express and PostgreSQL',
      'Integrated Gemini API for order insights and recommendations',
      'Utilized AWS S3 for scalable image storage',
    ],
    icon: 'award',
  },
  {
    title: 'Top 20% — Road Accident Risk Prediction',
    organization: 'Kaggle ML Competition',
    date: 'October 2025',
    description: 'Developed a prediction model achieving MAE of 0.05581 using advanced ensemble techniques.',
    highlights: [
      'Engineered features to capture non-linear patterns',
      'Tuned XGBoost, LGBoost, CatBoost using Bayesian Optimization',
      'Created weighted average ensemble optimized via cross-validation',
    ],
    icon: 'trending',
  },
  {
    title: '2nd Place — DataNyx (FinTech Track)',
    organization: 'AWS Cloud Club MJCET & IEEE SMC',
    date: 'November 2025',
    description: 'Recognized for building DataNyx, an AI-powered financial stability app leveraging modern technologies and ML-driven insights.',
    highlights: [
      'Built with React Native and Supabase',
      'Implemented machine-learning-driven financial insights',
    ],
    icon: 'medal',
  },
];

const iconMap = {
  trophy: Trophy,
  award: Award,
  medal: Medal,
  trending: TrendingUp,
};

const AchievementCard = memo(({ achievement, index }: { achievement: Achievement; index: number }) => {
  const IconComponent = iconMap[achievement.icon];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue/50 via-violet-500/30 to-transparent hidden md:block" />
      
      <motion.div
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 60px rgba(139, 92, 246, 0.1)'
        }}
        className="glass-panel-hover p-6 sm:p-8 ml-0 md:ml-12 relative group"
      >
        {/* Icon bubble */}
        <div className="absolute -left-6 top-6 w-12 h-12 rounded-full bg-gradient-to-br from-electric-blue to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30 hidden md:flex">
          <IconComponent size={20} className="text-white" />
        </div>
        
        {/* Mobile icon */}
        <div className="flex md:hidden items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <IconComponent size={16} className="text-white" />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={14} />
            <span>{achievement.date}</span>
          </div>
        </div>

        {/* Date badge - desktop */}
        <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm mb-3">
          <Calendar size={14} />
          <span>{achievement.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-indigo-200 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {achievement.title}
        </h3>

        {/* Organization */}
        <p className="text-electric-blue text-sm font-medium mb-3">
          {achievement.organization}
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
          {achievement.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2">
          {achievement.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
});

AchievementCard.displayName = 'AchievementCard';

const AchievementsComponent = () => {
  return (
    <section id="achievements" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
            <GradientText>Achievements</GradientText>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Recognition and milestones from competitions, hackathons, and internships
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Achievements = memo(AchievementsComponent);
