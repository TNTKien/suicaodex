"use server";

import { prisma } from "./prisma";

export async function getUserLib(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      followingMangaIDs: true,
      completedMangaIDs: true,
      planMangaIDs: true,
      readingMangaIDs: true,
    },
  });
}

export async function updateUserLib(
  userID: string,
  mangaID: string,
  type: "completed" | "reading" | "plan" | "following" | "none"
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        followingMangaIDs: true,
        completedMangaIDs: true,
        planMangaIDs: true,
        readingMangaIDs: true,
      },
    });

    if (!user) {
      return { message: "User not found", status: 404 };
    }

    const updateData: any = {
      followingMangaIDs: user.followingMangaIDs.filter((id) => id !== mangaID),
      completedMangaIDs: user.completedMangaIDs.filter((id) => id !== mangaID),
      planMangaIDs: user.planMangaIDs.filter((id) => id !== mangaID),
      readingMangaIDs: user.readingMangaIDs.filter((id) => id !== mangaID),
    };

    if (type !== "none") {
      const key = `${type}MangaIDs`;
      updateData[key].push(mangaID);
    }

    await prisma.user.update({
      where: { id: userID },
      data: updateData,
    });

    return { message: "Cập nhật thành công!", status: 200 };
  } catch (error) {
    console.error(error);
    return { message: "Có lỗi xảy ra, vui lòng thử lại sau!", status: 500 };
  }
}

export async function getLibType(userID: string, mangaID: string) {
  const user = await prisma.user.findUnique({
    where: { id: userID },
    select: {
      followingMangaIDs: true,
      completedMangaIDs: true,
      planMangaIDs: true,
      readingMangaIDs: true,
    },
  });

  if (!user) {
    return "none";
  }

  if (user.followingMangaIDs.includes(mangaID)) {
    return "following";
  }
  if (user.completedMangaIDs.includes(mangaID)) {
    return "completed";
  }
  if (user.planMangaIDs.includes(mangaID)) {
    return "plan";
  }
  if (user.readingMangaIDs.includes(mangaID)) {
    return "reading";
  }

  return "none";
}
