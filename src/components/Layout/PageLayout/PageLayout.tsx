import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type LayoutType = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children: React.ReactNode;
};
export const PageLayout = ({ children, className, ...props }: LayoutType) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full min-h-full py-6 gap-4 max-w-[1324px] mx-auto mt-[100px] md:px-0 px-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
