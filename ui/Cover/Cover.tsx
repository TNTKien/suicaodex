import { FC } from "react";

import { siteConfig } from "@/config/site";
import styles from "./cover.module.css";
import Image from "next/image";

interface CoverProps {
  filename: string;
}

const Cover: FC<CoverProps> = ({ filename }) => {
  const mangaID = siteConfig.mato.id;
  const coverURL = siteConfig.mangadexAPI.coverURL;
  return (
    <div className={`${styles.wrapp}`}>
      <Image
        src={`${coverURL}/${mangaID}/${filename}`}
        alt="Ảnh bìa Mato no Seihei"
        width={200}
        height={320}
      />
    </div>
  );
};

export default Cover;
