/*
  Warnings:

  - You are about to drop the column `profie_img` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `profie_img`,
    ADD COLUMN `profile_img` VARCHAR(191) NOT NULL DEFAULT 'avather.png';
