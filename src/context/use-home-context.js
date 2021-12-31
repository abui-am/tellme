import * as React from 'react';

const HomeContext = React.createContext(undefined);

function homeReducer(state, action) {
  switch (action.type) {
    case 'setUser': {
      return { ...state, startDate: action.payload };
    }
    case 'setEndDate': {
      return { ...state, endDate: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

const HomeProvider = ({ children }) => {
  const defValue = { startDate: new Date(), endDate: new Date() };
  const [state, dispatch] = React.useReducer(homeReducer, defValue);

  const value = { state, dispatch };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

function useHome() {
  const context = React.useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
}

export { HomeProvider, useHome };
