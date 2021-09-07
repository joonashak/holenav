import React, { useContext, createContext, useState, ReactNode } from "react";

const defaultState = {
  type: null,
  message: null,
  autoHide: false,
};

const NotificationContext = createContext([[], () => {}]);

type NotificationProviderProps = {
  children: ReactNode;
};

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [state, setState] = useState<any>(defaultState);

  return (
    <NotificationContext.Provider value={[state, setState]}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };

export default () => {
  const [state, setState] = useContext<any>(NotificationContext);

  /**
   * Display a global notification.
   * @param {string} message Notification message shown to the user.
   * @param {string} type One of Material-UI's Alert severity values (`error`, `warning`, `info` or
   * `success`).
   * @param {bool} autoHide Pass `true` to automatically hide the notification after a while.
   */
  const setNotification = (
    message: string,
    type: "error" | "warning" | "info" | "success",
    autoHide = false
  ) => setState({ type, message, autoHide });

  const resetNotification = () => setState(defaultState);

  const { type, message, autoHide } = state;

  return {
    type,
    message,
    autoHide,
    setNotification,
    resetNotification,
  };
};
