import { createState, useState } from "@hookstate/core";
import { AlertColor } from "@mui/material";

type NotificationState = {
  type: AlertColor | undefined;
  message: string | null;
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
  ) => state.set({ type, message, autoHide });

  const resetNotification = () => state.set(defaultState);

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
    setNotification,
    resetNotification,
  };
};
