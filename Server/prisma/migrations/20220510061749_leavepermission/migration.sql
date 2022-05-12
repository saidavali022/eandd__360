/*
  Warnings:

  - Added the required column `permission_type` to the `employee_leaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee_leaves` ADD COLUMN `permission_type` ENUM('', 'leave', 'latelogin', 'earlylogout') NOT NULL;
