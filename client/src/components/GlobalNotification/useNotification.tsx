import { createState, useState } from "@hookstate/core";
import { AlertColor } from "@mui/material";

type NotificationState = {
  type: AlertColor | undefined;
  message: string | null;
  autoHide: boolean;
};

type NotificationOptions = {
  type: AlertColor | undefined;
  autoHide: boolean;
};

const defaultState = {
  type: undefined,
  message: null,
  autoHide: false,
};

const notificationState = createState<NotificationState>(defaultState);

export default () => {
  const state = useState(notificationState);

  const setNotification = (
    message: string,
    options: NotificationOptions,
  ): void => {
    state.set({ message, type: options.type, autoHide: options.autoHide });
  };

  /** Hide current notification. */
  const resetNotification = (): void => state.set(defaultState);

  /**
   * Display a global success notification. Hides automatically after a while.
   *
   * @param message Message text.
   * @param options Options object. Set `autoHide` to `false` to make the
   *   notification persistent.
   */
  const showSuccessNotification = (
    message: string,
    options: Partial<NotificationOptions> = {},
  ): void => {
    setNotification(message, { type: "success", autoHide: true, ...options });
  };

  /**
   * Display a global info notification. Hides automatically after a while.
   *
   * @param message Message text.
   * @param options Options object. Set `autoHide` to `false` to make the
   *   notification persistent.
   */
  const showInfoNotification = (
    message: string,
    options: Partial<NotificationOptions> = {},
  ): void => {
    setNotification(message, { type: "info", autoHide: true, ...options });
  };

  /**
   * Display a global error notification.
   *
   * @param message Message text.
   * @param options Options object. Set `autoHide` to `true` to make the
   *   notification hide itself automatically after a while.
   */
  const showErrorNotification = (
    message: string,
    options: Partial<NotificationOptions> = {},
  ): void => {
    setNotification(message, { type: "error", autoHide: false, ...options });
  };

  /**
   * Display a global warning notification.
   *
   * @param message Message text.
   * @param options Options object. Set `autoHide` to `true` to make the
   *   notification hide itself automatically after a while.
   */
  const showWarningNotification = (
    message: string,
    options: Partial<NotificationOptions> = {},
  ): void => {
    setNotification(message, { type: "warning", autoHide: false, ...options });
  };

  return {
    get type() {
      return state.type.get();
    },
    get message() {
      return state.message.get();
    },
    get autoHide() {
      return state.autoHide.get();
    },
    showSuccessNotification,
    showErrorNotification,
    showWarningNotification,
    showInfoNotification,
    resetNotification,
  };
};
