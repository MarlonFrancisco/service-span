import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-right"
      richColors
      duration={4000}
      gap={12}
      style={
        {
          '--normal-bg': '#ffffff',
          '--normal-text': '#1f2937',
          '--normal-border': '#e5e7eb',
          '--normal-color': '#1f2937',
          '--success-bg': '#f0fdf4',
          '--success-text': '#166534',
          '--success-border': '#dcfce7',
          '--success-color': '#166534',
          '--error-bg': '#fef2f2',
          '--error-text': '#991b1b',
          '--error-border': '#fee2e2',
          '--error-color': '#991b1b',
          '--warning-bg': '#fffbeb',
          '--warning-text': '#b45309',
          '--warning-border': '#fef08a',
          '--warning-color': '#b45309',
          '--info-bg': '#f0f9ff',
          '--info-text': '#0c4a6e',
          '--info-border': '#bfdbfe',
          '--info-color': '#0c4a6e',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
