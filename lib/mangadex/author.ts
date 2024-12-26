import { Author } from "@/types";
import axiosInstance from "../axios";

export async function SearchAuthorByIds(ids: string[]): Promise<Author[]> {
  const { data } = await axiosInstance.get(`/author?`, {
    params: {
      limit: ids.length,
      ids: ids,
    },
  });

  return data.data.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes.name,
    };
  });
}
