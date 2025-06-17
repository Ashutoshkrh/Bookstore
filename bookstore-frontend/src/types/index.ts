// Re-export all types for easy importing
export * from './book';
export * from './author';
export * from './api';

// Common UI types
export interface SelectOption {
  value: string;
  label: string;
}

// Modal props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// Theme types
export type Theme = 'light' | 'dark';

// Navigation item
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  active?: boolean;
}
