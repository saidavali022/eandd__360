/*
  Warnings:

  - You are about to alter the column `employee_id` on the `checklists` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `checklists` MODIFY `employee_id` INTEGER NOT NULL;
