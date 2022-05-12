/*
  Warnings:

  - You are about to alter the column `send_check_list` on the `employee_resignation` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum("employee_resignation_send_check_list")`.
  - You are about to alter the column `send_feedback_form` on the `employee_resignation` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum("employee_resignation_send_feedback_form")`.

*/
-- AlterTable
ALTER TABLE `employee_resignation` MODIFY `send_check_list` ENUM('pending', 'completed', '') NOT NULL,
    MODIFY `send_feedback_form` ENUM('pending', 'completed', '') NOT NULL;
