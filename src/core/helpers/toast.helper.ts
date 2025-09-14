import { toast } from 'sonner';

// Toast de error
export const showError = (message: string) => {
  toast.error('Error', {
    description: message,
    style: {
      padding: '10px',
      '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
      '--normal-text': 'var(--destructive)',
      '--normal-border': 'var(--destructive)',
    } as React.CSSProperties & Record<string, string>,
  });
};

// Toast de éxito
export const showSuccess = (message: string) => {
  toast.success('Éxito', {
    description: message,
    style: {
      padding: '10px',
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
      '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
    } as React.CSSProperties & Record<string, string>,
  });
};

// Toast de advertencia
export const showWarning = (message: string) => {
  toast.warning('Atención', {
    description: message,
    style: {
      padding: '10px',
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
      '--normal-border': 'light-dark(var(--color-amber-600), var(--color-amber-400))',
    } as React.CSSProperties & Record<string, string>,
  });
};

// Toast informativo (opcional)
export const showInfo = (message: string) => {
  toast('Info', {
    description: message,
    style: {
      padding: '10px',
      '--normal-bg':
        'color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))',
      '--normal-text': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
      '--normal-border': 'light-dark(var(--color-sky-600), var(--color-sky-400))',
    } as React.CSSProperties & Record<string, string>,
  });
};
