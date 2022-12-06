import React, { ButtonHTMLAttributes } from "react";
import { cva, cx, VariantProps } from "class-variance-authority";

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

type ButtonProps = ButtonBaseProps & VariantProps<typeof classes>;

const classes = cva("text-white py-2 px-3 rounded-md", {
  variants: {
    size: {
      sm: "py-1 px-2",
      md: "py-2 px-4",
    },
    variant: {
      primary: [
        "bg-rose-500/60 border border-rose-600/60 hover:bg-rose-600/60",
      ],
      secondary: ["bg-neutral-800 border border-neutral-700"],
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  className = cx(classes(props), className);
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
