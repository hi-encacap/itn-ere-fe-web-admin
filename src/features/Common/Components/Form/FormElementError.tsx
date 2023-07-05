import { AnimatePresence, motion } from "framer-motion";

import { slugify } from "@utils/helpers";

interface FormElementErrorProps {
  error?: string;
}

const FormElementError = ({ error: errorProp }: FormElementErrorProps) => {
  return (
    <AnimatePresence>
      <motion.div className="relative -mb-2 mt-1.5 overflow-hidden text-sm">
        <motion.div
          key={slugify(errorProp ?? "")}
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          exit={{ y: -12 }}
          className="text-red-500"
        >
          {errorProp}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormElementError;
