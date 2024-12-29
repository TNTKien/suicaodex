import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function MyChip(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-1 px-[0.375rem] bg-default font-semibold rounded-[0.25rem]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
