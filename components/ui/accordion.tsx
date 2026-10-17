import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "cn";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-4 rounded-lg border border-transparent py-4 text-left text-base font-medium transition-all outline-none",
          "hover:text-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <span
          data-slot="accordion-trigger-icon"
          className="text-muted-foreground pointer-events-none mt-1 flex size-5 shrink-0 items-center justify-center sm:size-6"
        >
          <ChevronDownIcon className="size-5 group-aria-expanded/accordion-trigger:hidden sm:size-6" />
          <ChevronUpIcon className="hidden size-5 group-aria-expanded/accordion-trigger:block sm:size-6" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "text-muted-foreground h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-5 pr-8 leading-relaxed">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  AccordionPanel as AccordionContent,
};