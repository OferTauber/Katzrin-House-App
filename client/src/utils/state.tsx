import { makeAutoObservable } from 'mobx';
import { createContext, useContext, ReactNode } from 'react';
import { LogedUser } from './types';

class AppState {
  logedUser: LogedUser | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;

  constructor(logedUser?: LogedUser) {
    makeAutoObservable(this);
    this.logedUser = logedUser;
    this.isLoading = false;
    this.isError = false;
    this.error = undefined;
  }

  setLogedUser(logedUser?: LogedUser) {
    this.logedUser = logedUser;
  }

  logOut() {
    this.setLogedUser(undefined);
    // todo: Cookis!
  }
}

const appState = new AppState();

const AppStateContecst = createContext<AppState>(appState);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppStateContecst.Provider value={appState}>
      {children}
    </AppStateContecst.Provider>
  );
};

export const useAppState = () => useContext(AppStateContecst);
