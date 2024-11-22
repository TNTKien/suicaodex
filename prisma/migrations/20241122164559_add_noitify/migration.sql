/*
  Warnings:

  - You are about to drop the column `completedMangaIDs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `followingMangaIDs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `planMangaIDs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `readingMangaIDs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "completedMangaIDs",
DROP COLUMN "followingMangaIDs",
DROP COLUMN "planMangaIDs",
DROP COLUMN "readingMangaIDs";

-- CreateTable
CREATE TABLE "Notify" (
    "id" SERIAL NOT NULL,
    "toUserId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notify_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notify_toUserId_idx" ON "Notify"("toUserId");

-- AddForeignKey
ALTER TABLE "Notify" ADD CONSTRAINT "Notify_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
