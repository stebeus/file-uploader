/*
  Warnings:

  - Added the required column `fileFormat` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "fileFormat" TEXT NOT NULL;
