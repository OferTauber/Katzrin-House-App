import { action, makeAutoObservable, observable } from 'mobx';
import { createContext, useContext, ReactNode } from 'react';
import { LogedUser } from './types';
import Cookies from 'js-cookie';
import { getAuthToken } from './axios';
import * as jose from 'jose';

const katzrin_token = 'katzrin_token';

class AppState {
  logedUser: LogedUser | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
  token: string;

  

  setLogedUser(logedUser?: LogedUser) {
    this.logedUser = logedUser;
  }

  logOut() {
    this.setLogedUser(undefined);
    this.updateToken();
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.isError = false;
    this.error = false;

    try {
      const token = await getAuthToken(email, password);
      const decoded: any = jose.decodeJwt(token);
      const user: LogedUser = decoded;
      this.updateToken(token);
      this.logedUser = user;
      console.log('Updated');
      console.log(this.logedUser);
      console.log(this);
    } catch (e) {
      console.log(e);
      this.isError = true;
      this.error = e;
    } finally {
      this.isLoading = false;
    }
  }

  updateToken(newToken?: string) {
    if (newToken) {
      Cookies.set(katzrin_token, newToken);
    } else {
      Cookies.remove(katzrin_token);
    }

    this.token = Cookies.get(katzrin_token) || '';
  }

  constructor(logedUser?: LogedUser) {
    makeAutoObservable(this, {
      logedUser: observable,
      isLoading: observable,
      isError: observable,
      error: observable,
      token: observable,
      setLogedUser: action,
      logOut: action,
      login: action,
      updateToken: action,
    });
    this.logedUser = logedUser;
    this.isLoading = false;
    this.isError = false;
    this.error = undefined;
    this.token = Cookies.get(katzrin_token) || '';
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
