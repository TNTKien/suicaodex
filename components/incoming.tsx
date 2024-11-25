import Plana from "@/public/incoming.png";
import Image from "next/image";

export default function Incomming() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center py-10">
      <Image src={Plana} alt="Plana" />
      <p className="text-3xl font-bold text-center uppercase">
        SuicaoDex đang bảo trì, lát nữa quay lại nha!!
      </p>
    </div>
  );
}
