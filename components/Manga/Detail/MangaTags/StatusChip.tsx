import MyChip from "@/components/Custom/MyChip";

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
    <MyChip
      className={`uppercase bg-default ${statusTextColor} border-2 ${statusBorder}`}
    >
      <span className={`${statusBg} rounded-full w-2 h-2`} />
      <a
        href={`/advanced-search?status=${status}`}
        className="text-xs hover:underline"
      >
        {status}
      </a>
    </MyChip>
  );
};

export default StatusChip;
