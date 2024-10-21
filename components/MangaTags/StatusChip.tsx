import { Chip } from "@nextui-org/react";
import { Dot } from "lucide-react";

interface StatusChipProps {
  status: string;
}

const StatusChip = ({ status }: StatusChipProps) => {
  const statusTextColor = {
    ongoing: "text-blue-500 dark:text-blue-400",
    completed: "text-green-500 dark:text-green-400",
    hiatus: "text-gray-500 dark:text-gray-400",
    cancelled: "text-red-500 dark:text-red-400",
  }[status];

  const statusBorder = {
    ongoing: "border-blue-500 dark:border-blue-400",
    completed: "border-green-500 dark:border-green-400",
    hiatus: "border-gray-500 dark:border-gray-400",
    cancelled: "border-red-500 dark:border-red-400",
  }[status];

  const statusBg = {
    ongoing: "bg-blue-500 dark:bg-blue-400",
    completed: "bg-green-500 dark:bg-green-400",
    hiatus: "bg-gray-500 dark:bg-gray-400",
    cancelled: "bg-red-500 dark:bg-red-400",
  }[status];

  return (
    <Chip
      classNames={{
        base: `bg-default ${statusBorder}`,
        content: `uppercase ${statusTextColor}`,
      }}
      size="sm"
      radius="sm"
      variant="bordered"
      startContent={
        <span className={`${statusBg} rounded-full w-2 h-2`}></span>
      }
    >
      {status}
    </Chip>
  );
};

export default StatusChip;
