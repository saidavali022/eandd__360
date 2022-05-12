/*
  Warnings:

  - The values [] on the enum `employee_resignation_send_check_list` will be removed. If these variants are still used in the database, this will fail.
  - The values [] on the enum `employee_resignation_send_feedback_form` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `employee_resignation` MODIFY `send_check_list` ENUM('pending', 'awaiting', 'completed') NOT NULL,
    MODIFY `send_feedback_form` ENUM('pending', 'awaiting', 'completed') NOT NULL;
