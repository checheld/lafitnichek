/*
  Warnings:

  - You are about to drop the column `isClosed` on the `Round` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Round" DROP COLUMN "isClosed",
ALTER COLUMN "end_date" DROP NOT NULL;
