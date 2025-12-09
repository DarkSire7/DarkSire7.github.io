import { motion } from 'framer-motion';
import { memo } from 'react';
import GradientText from '../ui/GradientText';
import {
  siCplusplus,
  siPython,
  siScikitlearn,
  siPandas,
  siNumpy,
  siFastapi,
  siNodedotjs,
  siExpress,
  siDocker,
  siGit,
  siGooglecloud,
  siRender,
  siPostgresql,
} from 'simple-icons';

const TechLogo = ({ name, icon }: { name: string; icon: string }) => (
  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-electric-blue/30 transition-all group">
    <div 
      className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: icon }}
      style={{ fill: 'currentColor' }}
    />
    <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap">{name}</span>
  </div>
);

const techStack = [
  { node: <TechLogo name="C++" icon={siCplusplus.svg} />, title: "C++" },
  { node: <TechLogo name="Python" icon={siPython.svg} />, title: "Python" },
  { node: <TechLogo name="Scikit-Learn" icon={siScikitlearn.svg} />, title: "Scikit-Learn" },
  { node: <TechLogo name="Pandas" icon={siPandas.svg} />, title: "Pandas" },
  { node: <TechLogo name="NumPy" icon={siNumpy.svg} />, title: "NumPy" },
  { node: <TechLogo name="XGBoost" icon={`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="10">XGB</text></svg>`} />, title: "XGBoost" },
  { node: <TechLogo name="LightGBM" icon={`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="9">LGBM</text></svg>`} />, title: "LightGBM" },
  { node: <TechLogo name="CatBoost" icon={`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="10">CAT</text></svg>`} />, title: "CatBoost" },
  { node: <TechLogo name="FastAPI" icon={siFastapi.svg} />, title: "FastAPI" },
  { node: <TechLogo name="Node.js" icon={siNodedotjs.svg} />, title: "Node.js" },
  { node: <TechLogo name="Express" icon={siExpress.svg} />, title: "Express" },
  { node: <TechLogo name="Docker" icon={siDocker.svg} />, title: "Docker" },
  { node: <TechLogo name="Git" icon={siGit.svg} />, title: "Git" },
  { node: <TechLogo name="Google Cloud" icon={siGooglecloud.svg} />, title: "Google Cloud" },
  { node: <TechLogo name="AWS" icon={`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="10">AWS</text></svg>`} />, title: "AWS" },
  { node: <TechLogo name="Render" icon={siRender.svg} />, title: "Render" },
  { node: <TechLogo name="PostgreSQL" icon={siPostgresql.svg} />, title: "PostgreSQL" },
  { node: <TechLogo name="SQL" icon={`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="10">SQL</text></svg>`} />, title: "SQL" },
];

const TechStackComponent = () => {
  return (
    <section id="techstack" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
            My <GradientText>Tech Stack</GradientText>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {techStack.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              {item.node}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TechStack = memo(TechStackComponent);
