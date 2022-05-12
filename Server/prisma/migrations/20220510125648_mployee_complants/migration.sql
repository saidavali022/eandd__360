/*
  Warnings:

  - The values [complants] on the enum `employee_complants_advices_suggestions_letter_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `employee_complants_advices_suggestions` MODIFY `letter_type` ENUM('complaints', 'advices_suggestions') NOT NULL;
