import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';


type props = {
    children: React.ReactNode; 
    initial?: object;
    animate?: object;
    transition?: object;
}

const Animate: React.FC<props> = ({
    children,
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    transition = { duration: 0.8 }
}) => {
    return (
        <AnimatePresence>
            <motion.div 
                initial={initial}
                animate={animate}
                transition={transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default Animate;