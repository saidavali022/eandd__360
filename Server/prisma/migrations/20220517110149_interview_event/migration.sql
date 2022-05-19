/*
  Warnings:

  - You are about to alter the column `event_id` on the `event_attendees` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `event_attendees` DROP FOREIGN KEY `event_attendees_event_id_fkey`;

-- AlterTable
ALTER TABLE `event_attendees` ADD COLUMN `location` VARCHAR(255) NULL,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `response` TEXT NULL,
    MODIFY `event_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `interview_status` TEXT NULL,
    ADD COLUMN `status` VARCHAR(255) NULL,
    MODIFY `description` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `recruits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `present_ctc` VARCHAR(191) NULL,
    `expected_ctc` VARCHAR(191) NULL,
    `experience` DOUBLE NULL,
    `maritial_status` VARCHAR(191) NULL,
    `highest_education_qualification` VARCHAR(191) NULL,
    `previous_company` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
