"use client";

import { useState } from "react";
import type { AlertType } from "../components/AlertDialog";

interface AlertConfig {
  type?: AlertType;
  title: string;
  message: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  singleButton?: boolean;
  showCloseButton?: boolean;
}

export const useAlertDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState<AlertConfig>({
    title: "",
    message: "",
  });
  const [callbacks, setCallbacks] = useState<{
    onPrimary?: () => void;
    onSecondary?: () => void;
    onClose?: () => void;
  }>({});

  const showAlert = (
    alertConfig: AlertConfig,
    onPrimary?: () => void,
    onSecondary?: () => void,
    onClose?: () => void
  ) => {
    setConfig(alertConfig);
    setCallbacks({ onPrimary, onSecondary, onClose });
    setIsVisible(true);
  };

  const hideAlert = () => {
    setIsVisible(false);
    callbacks.onClose?.();
  };

  const handlePrimary = () => {
    callbacks.onPrimary?.();
    hideAlert();
  };

  const handleSecondary = () => {
    callbacks.onSecondary?.();
    hideAlert();
  };

  // Convenience methods for different alert types
  const showSuccess = (
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    showAlert(
      {
        type: "success",
        title,
        message,
        primaryButtonText: "Great!",
        singleButton: true,
      },
      onConfirm
    );
  };

  const showError = (
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    showAlert(
      {
        type: "error",
        title,
        message,
        primaryButtonText: "OK",
        singleButton: true,
      },
      onConfirm
    );
  };

  const showWarning = (
    title: string,
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    showAlert(
      {
        type: "warning",
        title,
        message,
        primaryButtonText: "Continue",
        secondaryButtonText: "Cancel",
      },
      onConfirm,
      onCancel
    );
  };

  const showConfirmation = (
    title: string,
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    showAlert(
      {
        type: "info",
        title,
        message,
        primaryButtonText: "Confirm",
        secondaryButtonText: "Cancel",
      },
      onConfirm,
      onCancel
    );
  };

  return {
    isVisible,
    config,
    showAlert,
    hideAlert,
    handlePrimary,
    handleSecondary,
    showSuccess,
    showError,
    showWarning,
    showConfirmation,
  };
};

// Default export as well for flexibility
export default useAlertDialog;
