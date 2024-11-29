import Image from "next/image";

import Plana from "@/public/incoming.png";

export default function Incomming() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center py-10">
      <Image alt="Plana" src={Plana} />
      <p className="text-3xl font-bold text-center uppercase">
        SuicaoDex đang bảo trì, lát nữa quay lại nha!!
      </p>
    </div>
  );
}
