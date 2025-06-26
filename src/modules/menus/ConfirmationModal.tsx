"use client";

import { X, AlertTriangle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: "text-red-600",
          button: "bg-red-600 hover:bg-red-700",
          iconBg: "bg-red-100",
        };
      case "warning":
        return {
          icon: "text-yellow-600",
          button: "bg-yellow-600 hover:bg-yellow-700",
          iconBg: "bg-yellow-100",
        };
      default:
        return {
          icon: "text-blue-600",
          button: "bg-blue-600 hover:bg-blue-700",
          iconBg: "bg-blue-100",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      style={{ zIndex: 10001 }}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6"
        style={{ zIndex: 10002 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${styles.iconBg}`}>
              <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
