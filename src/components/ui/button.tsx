import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { LoadingDots } from './loadingIcon'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-md font-medium ring-offset-background transition cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:opacity-70 text-foreground',
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    'active:opacity-70',
  ],
  {
    variants: {
      size: {
        default: 'h-12 px-8 py-2 rounded-lg',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        ticket: 'rounded-xl font-medium text-base py-3 px-4',
        none:'h-fit',
      },
      variant: {
        primary: [
          'bg-primary text-neutral-inverse opacity-90 border border-transparent hover:opacity-100 font-medium',
          'hover:filter hover:brightness-[1.05]',
        ],
        'primary-light':
          'bg-primary/5 text-primary border border-transparent hover:bg-primary/10 font-medium',
        'primary-ghost':
          'text-primary border border-transparent hover:bg-primary/5 font-medium',
        'primary-link': `bg-transparent text-primary hover:underline font-medium underline-offset-4 p-0 m-0 h-fit w-fit`,
        outline: 'border border-border bg-surface text-neutral opacity-80 hover:opacity-100',
        secondary:
          'bg-neutral-inverse dark:bg-element text-neutral/80 hover:text-neutral shadow-sm border border-border dark:border-none',
        ghost: 'text-neutral/90 hover:bg-surface hover:text-neutral',
        calendar: 'hover:bg-surface hover:text-neutral',
        link: 'text-primary underline-offset-4 hover:underline',
        ticket: 'border border-border bg-none opacity-80 hover:opacity-100',
        input:
          'border border-border bg-element text-neutral/70 hover:bg-surface hover:text-neutral',
        destructive: 'bg-destructive text-neutral hover:opacity-90',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled = false,
      loadingText = '',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          }),
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex justify-center items-center w-fit gap-2">
            <LoadingDots className="h-6 w-6" /> {loadingText}
          </div>
        ) : (
          <>{props.children}</>
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
