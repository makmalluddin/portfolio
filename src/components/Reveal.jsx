import { motion, useReducedMotion } from "framer-motion";

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
  duration = 0.45,
  amount = 0.1,
  margin = "0px 0px -10% 0px",
  once = true,
  ...restProps
}) {
  const reduceMotion = useReducedMotion();
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount, margin }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...restProps}
    >
      {children}
    </MotionDiv>
  );
}

export default Reveal;
