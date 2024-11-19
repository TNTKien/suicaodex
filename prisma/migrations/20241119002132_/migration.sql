/*
  Warnings:

  - You are about to drop the column `bookmarkMangaIDs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bookmarkMangaIDs",
ADD COLUMN     "completedMangaIDs" TEXT[],
ADD COLUMN     "planMangaIDs" TEXT[],
ADD COLUMN     "readingMangaIDs" TEXT[];
