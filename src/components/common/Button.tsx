import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-secondary text-white hover:bg-secondary/90 shadow-md hover:shadow-lg',
    secondary: 'bg-accent text-white hover:bg-accent/90 shadow-md hover:shadow-lg',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
    ghost: 'text-accent hover:bg-accent/5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    <button
      className={cn(
        'btn-text inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
