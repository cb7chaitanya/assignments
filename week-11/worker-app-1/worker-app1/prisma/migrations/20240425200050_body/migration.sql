/*
  Warnings:

  - Added the required column `body` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "body" TEXT NOT NULL;
