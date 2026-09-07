import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock, Trophy } from 'lucide-react';
import { memo } from 'react';
import GradientText from '../ui/GradientText';
import { FeaturedProject } from './FeaturedProject';

interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
  technologies: string;
  github?: string;
  demo?: string;
  award?: string;
  privateRepo?: boolean;
}

const projects: Project[] = [
  {
    title: 'SkillsSeekho',
    period: 'June 2026',
    description:
      'A voice-first hyperlocal marketplace for people who would rather speak than type. English speech routes to Groq Whisper while nine-plus Indian regional languages go through Sarvam AI, and a Llama-3.3-70B intent-extraction stage turns the raw transcript into validated JSON — search queries, listing details, user profiles — so downstream code never parses free text.',
    tags: ['Speech-to-Text', 'LLMs', 'Multilingual', 'Structured Output'],
    technologies: 'Python, Groq Whisper, Sarvam AI, Llama-3.3-70B, FastAPI',
    award: '2nd Place — HACKPRIX',
    privateRepo: true,
  },
  {
    title: 'SmartMonitor',
    period: 'April 2026',
    description:
      'Real-time spatial analytics over a video feed. A YOLOv11 and OpenCV pipeline tracks people through the frame, and custom geometry resolves each track against user-drawn polygonal regions to log unique entry and exit events — deduplicated, so one person loitering on a boundary does not become forty crossings.',
    tags: ['Computer Vision', 'YOLOv11', 'OpenCV', 'Streamlit'],
    technologies: 'Python, YOLOv11, OpenCV, Streamlit, Docker, SQLite, Hugging Face Spaces',
    privateRepo: true,
  },
  {
    title: 'PESO',
    period: 'November 2025',
    description:
      'A predictive financial safety net for people with irregular income. An XGBoost risk engine scores stability from 0 to 100, capturing the non-linear debt thresholds where a household tips from coping to distressed, paired with a retrieval-augmented chatbot grounded in verified protocols so its advice cannot drift into invention.',
    tags: ['XGBoost', 'RAG', 'ChromaDB', 'FastAPI'],
    technologies: 'Python, XGBoost, ChromaDB, OpenAI, FastAPI, Docker, Google Cloud Run',
    privateRepo: true,
  },
  {
    title: 'Road Accident Risk',
    period: 'November 2025',
    description:
      'A Kaggle competition entry predicting accident risk from road, weather and time-of-day conditions. Placed in the top 20% with a weighted ensemble of XGBoost, LightGBM and CatBoost over engineered interaction features.',
    tags: ['Kaggle', 'Ensembles', 'Feature Engineering'],
    technologies: 'Python, Pandas, Scikit-learn, XGBoost, LightGBM, CatBoost',
    award: 'Top 20%',
    github: 'https://github.com/DarkSire7/road_accident_prediction',
  },
  {
    title: 'SwiftBytes',
    period: 'July 2025',
    description:
      'A canteen management system for MJCET — full-stack Node.js, Express and PostgreSQL, with a Gemini API integration surfacing ordering patterns back to the operators rather than leaving the data sitting in a table.',
    tags: ['Full-Stack', 'PostgreSQL', 'Gemini API'],
    technologies: 'Node.js, Express, PostgreSQL, Gemini API, Render, AWS S3',
    award: '2nd Place',
    github: 'https://github.com/ArfanCodes/SwiftBytes',
  },
];

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 60px rgba(139, 92, 246, 0.1)',
      }}
      className="glass-panel-hover overflow-hidden group relative flex flex-col"
    >
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <span className="text-5xl sm:text-6xl font-black text-white/5 group-hover:text-electric-blue/20 transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-4 sm:space-y-5 flex flex-col h-full">
        <div className="space-y-2 pr-12 sm:pr-16">
          <h3 className="text-xl sm:text-2xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-indigo-200 group-hover:to-violet-400 group-hover:bg-clip-text group-hover:text-transparent">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono text-gray-500">{project.period}</span>
            {project.award && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded bg-amber-400/10 border border-amber-400/25 text-amber-300">
                <Trophy size={10} />
                {project.award}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{project.description}</p>

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

        <div className="pt-4 mt-auto border-t border-white/5 group-hover:border-electric-blue/20 transition-colors duration-300">
          <p className="text-xs sm:text-sm text-gray-500 mb-2 font-medium">Technologies:</p>
          <p className="text-xs sm:text-sm text-gray-300 italic">{project.technologies}</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
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
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-electric-blue text-sm font-semibold hover:gap-3 transition-all"
            >
              Live demo
              <ExternalLink size={14} className="opacity-70" />
            </motion.a>
          )}
          {project.privateRepo && !project.github && !project.demo && (
            <span className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium">
              <Lock size={14} />
              Private repo &mdash; walkthrough on request
            </span>
          )}
        </div>
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
            Featured <GradientText>Projects</GradientText>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Prediction systems, computer vision, and the occasional thing built because it annoyed me
          </p>
        </motion.div>

        <FeaturedProject />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Projects = memo(ProjectsComponent);
