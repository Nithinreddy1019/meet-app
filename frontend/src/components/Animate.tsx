import { motion, AnimatePresence } from 'framer-motion';

type props = {
    children: string | JSX.Element | JSX.Element[]
}

const Animate = ({children}: props) => {
    return (
        <AnimatePresence>
            <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:0.8}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default Animate
