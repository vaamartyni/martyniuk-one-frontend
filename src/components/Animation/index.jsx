import { motion } from "framer-motion";

const Animation = ({ children }) => {
    const animations = {
        initial: {opacity: 0, transition: {duration: 0.3}},
        animate: {opacity: 1, transition: {duration: 0.3}},
        exit: {opacity: 0, transition: {duration: 0.3}},
    };
return (
    <motion.div variants={animations} initial="initial" animate="animate" exit="exit">
        {children}
    </motion.div>
)
}

export default Animation;