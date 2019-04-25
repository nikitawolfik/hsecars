import React from 'react';

export const MiddlebarContext = React.createContext({
  opened: true,
  toggleOpened: () => {},
});
