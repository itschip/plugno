import { forwardRef, InputHTMLAttributes } from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof classes>;

const classes = cva("rounded-md outline-none", {
  variants: {
    variant: {
      default: ["bg-neutral-800 border border-neutral-700 text-white"],
    },
    size: {
      md: "py-2 px-3 text-md",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, variant, className, ...props }, ref) => {
    className = cx(classes({ size, variant }), className);
    return <input ref={ref} className={className} {...props} />;
  }
);
Input.displayName = "Input";
