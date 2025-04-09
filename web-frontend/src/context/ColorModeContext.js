import React, { createContext, useMemo, useState } from 'react';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {}
});

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({ mode, toggleColorMode }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};
