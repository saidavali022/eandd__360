/*
  Warnings:

  - Added the required column `letter_type` to the `employee_complants_advices_suggestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee_complants_advices_suggestions` ADD COLUMN `letter_type` ENUM('complants', 'advices_suggestions') NOT NULL;
