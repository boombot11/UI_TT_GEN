import React, { createContext, useContext, useState } from 'react';

const StatisticsContext = createContext();

export const StatisticsProvider = ({ children }) => {
  const [statistics, setStatistics] = useState(null);

  return (
    <StatisticsContext.Provider value={{ statistics, setStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};