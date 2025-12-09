import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { memo } from 'react';
import GradientText from '../ui/GradientText';

interface Project {
  title: string;
  description: string;
  tags: string[];
  technologies: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'Croplytics: End-to-End ML API',
    description: 'A REST API built with FastAPI and Docker, serving ML models (92% accuracy) to recommend crops and predict yield. Deployed on Google Cloud (GCP).',
    tags: ['Machine Learning', 'FastAPI', 'Docker', 'GCP'],
    technologies: 'Python, FastAPI, XGBoost, Docker, GCP',
    github: 'https://github.com/DarkSire7/croplytics_api',
  },
  {
    title: 'Kaggle Competition: Road Accident Risk (Top 20%)',
    description: 'Achieved a Top 20% ranking using advanced feature engineering and a weighted ensemble of XGBoost, LGBoost, and CatBoost models.',
    tags: ['Kaggle', 'Ensemble Models', 'Feature Engineering'],
    technologies: 'Python, Pandas, Scikit-learn, XGBoost, LightGBM',
    github: 'https://github.com/DarkSire7/road_accident_prediction',
  },
  {
    title: 'SwiftBytes: 2nd Place Award-Winning Canteen App',
    description: 'A full-stack web app (Node.js/Express/PostgreSQL) with a Gemini API integration for data insights. Deployed on Render and AWS S3.',
    tags: ['Full-Stack', 'Gemini API', 'PostgreSQL', 'Award-Winning'],
    technologies: 'Node.js, Express, PostgreSQL, Gemini API, Render, AWS S3',
    github: 'https://github.com/ArfanCodes/SwiftBytes',
  },
];

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 60px rgba(139, 92, 246, 0.1)'
      }}
      className="glass-panel-hover overflow-hidden group relative"
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <span className="text-5xl sm:text-6xl font-black text-white/5 group-hover:text-electric-blue/20 transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      
      <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
        <h3 
          className="text-xl sm:text-2xl font-bold text-white pr-12 sm:pr-16 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-indigo-200 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent"
        >
          {project.title}
        </h3>
        
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-gray-300 group-hover:border-electric-blue/30 group-hover:bg-electric-blue/5 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-white/5 group-hover:border-electric-blue/20 transition-colors duration-300">
          <p className="text-xs sm:text-sm text-gray-500 mb-2 font-medium">Technologies:</p>
          <p className="text-xs sm:text-sm text-gray-300 italic">{project.technologies}</p>
        </div>
        
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-electric-blue text-sm font-semibold hover:gap-3 transition-all"
          >
            <Github size={16} />
            View on GitHub
            <ExternalLink size={14} className="opacity-70" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsComponent = () => {
  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
            Featured <GradientText>Projects</GradientText>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Real-world ML and full-stack solutions delivering measurable impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Projects = memo(ProjectsComponent);
