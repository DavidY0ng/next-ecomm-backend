/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Made the column `path` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "path" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_path_key" ON "Image"("path");
