"use server";

import type { Category } from "@prisma/client";
import { prisma } from "./prisma";

// export async function getUserLib(id: string) {
//   return prisma.user.findUnique({
//     where: { id },
//     select: {
//       followingMangaIDs: true,
//       completedMangaIDs: true,
//       planMangaIDs: true,
//       readingMangaIDs: true,
//     },
//   });
// }

// export async function updateUserLib(
//   userID: string,
//   mangaID: string,
//   type: "completed" | "reading" | "plan" | "following" | "none"
// ) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userID },
//       select: {
//         followingMangaIDs: true,
//         completedMangaIDs: true,
//         planMangaIDs: true,
//         readingMangaIDs: true,
//       },
//     });

//     if (!user) {
//       return {
//         message: "Vui lòng đăng nhập lại để sử dụng tính năng này!",
//         status: 404,
//       };
//     }

//     const updateData: any = {
//       followingMangaIDs: user.followingMangaIDs.filter((id) => id !== mangaID),
//       completedMangaIDs: user.completedMangaIDs.filter((id) => id !== mangaID),
//       planMangaIDs: user.planMangaIDs.filter((id) => id !== mangaID),
//       readingMangaIDs: user.readingMangaIDs.filter((id) => id !== mangaID),
//     };

//     if (type !== "none") {
//       const key = `${type}MangaIDs`;
//       updateData[key].push(mangaID);
//     }

//     await prisma.user.update({
//       where: { id: userID },
//       data: updateData,
//     });

//     return { message: "Cập nhật thành công!", status: 200 };
//   } catch (error) {
//     console.error(error);
//     return { message: "Có lỗi xảy ra, vui lòng thử lại sau!", status: 500 };
//   }
// }

// export async function getLibType(userID: string, mangaID: string) {
//   const user = await prisma.user.findUnique({
//     where: { id: userID },
//     select: {
//       followingMangaIDs: true,
//       completedMangaIDs: true,
//       planMangaIDs: true,
//       readingMangaIDs: true,
//     },
//   });

//   if (!user) {
//     return "none";
//   }

//   if (user.followingMangaIDs.includes(mangaID)) {
//     return "following";
//   }
//   if (user.completedMangaIDs.includes(mangaID)) {
//     return "completed";
//   }
//   if (user.planMangaIDs.includes(mangaID)) {
//     return "plan";
//   }
//   if (user.readingMangaIDs.includes(mangaID)) {
//     return "reading";
//   }

//   return "none";
// }

//new

export async function getMangaCategory(
  userId: string,
  mangaId: string
): Promise<string | "NONE"> {
  try {
    const result = await prisma.libraryManga.findFirst({
      where: {
        mangaId: mangaId,
        library: {
          userId: userId,
        },
      },
      select: {
        category: true,
      },
    });

    return result ? result.category : "NONE";
  } catch (error) {
    console.error("Error fetching manga category:", error);
    throw new Error("Failed to fetch manga category.");
  }
}

export async function updateMangaCategory(
  userId: string,
  mangaId: string,
  category: Category | "NONE",
  latestChapterId: string
): Promise<{ message: string; status: number }> {
  try {
    // Tìm hoặc tạo thư viện của người dùng
    let library = await prisma.library.findUnique({
      where: { userId },
    });

    if (!library) {
      library = await prisma.library.create({
        data: { userId },
      });
      console.log(`Library created for user ${userId}.`);
    }

    const libraryId = library.id;

    if (category === "NONE") {
      // Xóa Manga khỏi thư viện nếu category là "NONE"
      const deleteResult = await prisma.libraryManga.deleteMany({
        where: {
          libraryId,
          mangaId,
        },
      });

      if (deleteResult.count === 0) {
        return { message: "Manga not found in the library.", status: 404 };
      }

      return {
        message: `Cập nhật thành công!`,
        status: 200,
      };
    } else {
      // Kiểm tra xem Manga đã tồn tại trong bảng `Manga` chưa
      const existingManga = await prisma.manga.findUnique({
        where: { mangadexId: mangaId },
      });

      if (!existingManga) {
        // Nếu Manga chưa tồn tại, tạo mới trong bảng Manga
        await prisma.manga.create({
          data: {
            mangadexId: mangaId,
            latestChapterId,
          },
        });
      } else if (existingManga.latestChapterId !== latestChapterId) {
        // Cập nhật `latestChapterId` nếu có sự thay đổi
        await prisma.manga.update({
          where: { mangadexId: mangaId },
          data: { latestChapterId },
        });
      }

      // Kiểm tra xem Manga đã tồn tại trong thư viện chưa
      const existingEntry = await prisma.libraryManga.findFirst({
        where: {
          libraryId,
          mangaId,
        },
      });

      if (existingEntry) {
        // Cập nhật category nếu đã tồn tại
        await prisma.libraryManga.update({
          where: { id: existingEntry.id },
          data: { category },
        });
        return {
          message: `Cập nhật thành công!`,
          status: 200,
        };
      } else {
        // Thêm Manga vào thư viện nếu chưa tồn tại
        await prisma.libraryManga.create({
          data: {
            libraryId,
            mangaId,
            category,
          },
        });
        return {
          message: `Cập nhật thành công!`,
          status: 201,
        };
      }
    }
  } catch (error) {
    console.error("Error updating manga category:", error);
    return {
      message: "Có lỗi xảy ra, vui lòng thử lại sau!",
      status: 500,
    };
  }
}

export async function getUserLibrary(userId: string): Promise<{
  FOLLOWING: string[];
  READING: string[];
  PLAN: string[];
  COMPLETED: string[];
}> {
  try {
    const result = {
      FOLLOWING: [] as string[],
      READING: [] as string[],
      PLAN: [] as string[],
      COMPLETED: [] as string[],
    };
    // Tìm thư viện của người dùng
    const library = await prisma.library.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!library) {
      //throw new Error("Library not found for the specified user.");
      return result;
    }

    // Truy vấn tất cả các manga trong thư viện
    const libraryMangas = await prisma.libraryManga.findMany({
      where: { libraryId: library.id },
      select: {
        mangaId: true,
        category: true,
      },
    });

    // Phân loại manga theo category
    // const result = {
    //   FOLLOWING: [] as string[],
    //   READING: [] as string[],
    //   PLAN: [] as string[],
    //   COMPLETED: [] as string[],
    // };

    for (const { mangaId, category } of libraryMangas) {
      result[category].push(mangaId);
    }

    return result;
  } catch (error) {
    console.error("Error fetching user library:", error);
    throw new Error("Failed to fetch user library.");
  }
}
