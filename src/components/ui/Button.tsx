import { motion } from 'framer-motion';
import { memo } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ variant, children, as = 'button', ...props }: ButtonProps) => {
  const Component = as === 'a' ? motion.a : motion.button;
  const baseStyles = "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20"
  };
  
  return (
    <Component
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default memo(Button);
