import Image from "next/image";
import Baotri from "@/public/maint.jpg";

export default function Maintenance() {
  return (
    <div className="flex justify-center items-center">
      <Image src={Baotri} alt="Bảo trì" className="rounded-lg" quality={100} />
    </div>
  );
}
