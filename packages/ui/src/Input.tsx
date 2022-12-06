import React, { InputHTMLAttributes } from "react";
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

export const Input: React.FC<InputProps> = ({
  size,
  variant,
  className,
  ...props
}) => {
  className = cx(classes({ size, variant }), className);
  return <input className={className} {...props} />;
};
