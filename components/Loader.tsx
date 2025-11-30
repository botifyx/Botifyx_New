import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20" aria-label="Loading section...">
      <div className="w-12 h-12 rounded-full animate-spin border-4 border-dashed border-brand-primary dark:border-brand-accent"></div>
    </div>
  );
};

export default Loader;
