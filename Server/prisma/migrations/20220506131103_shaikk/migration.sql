-- AlterTable
ALTER TABLE `employee_resignation` ADD COLUMN `send_check_list` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `send_feedback_form` BOOLEAN NOT NULL DEFAULT false;
