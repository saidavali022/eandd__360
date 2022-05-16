/*
  Warnings:

  - You are about to drop the column `create_at` on the `employee_complants_advices_suggestions` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `employee_letters` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `employee_resignation` table. All the data in the column will be lost.
  - You are about to drop the column `create_by` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `feed_quasion_id` on the `feedback_questions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.
  - You are about to alter the column `dob` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.
  - You are about to alter the column `doj` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.
  - A unique constraint covering the columns `[employee_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kind` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feed_question_id` to the `feedback_questions` table without a default value. This is not possible if the table is not empty.
  - Made the column `priority` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `id` ON `event_attendees`;

-- AlterTable
ALTER TABLE `employee_complants_advices_suggestions` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `employee_letters` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `employee_resignation` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `event_attendees` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `events` DROP COLUMN `create_by`,
    ADD COLUMN `created_by` VARCHAR(255) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `end` DATETIME(3) NOT NULL,
    ADD COLUMN `kind` VARCHAR(191) NOT NULL,
    ADD COLUMN `start` DATETIME(3) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `feedback` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `feedback_questions` DROP COLUMN `feed_quasion_id`,
    ADD COLUMN `feed_question_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `status` ENUM('draft', 'pending', 'completed', 'started', '') NOT NULL DEFAULT 'pending',
    MODIFY `priority` ENUM('high', 'medium', 'low') NOT NULL DEFAULT 'low';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `role` ENUM('user', 'hr', 'admin') NOT NULL DEFAULT 'user',
    ADD COLUMN `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `dob` DATE NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `doj` DATE NULL,
    MODIFY `profile_img` VARCHAR(191) NULL DEFAULT 'avater.png',
    MODIFY `blood_group` VARCHAR(191) NULL,
    MODIFY `department` VARCHAR(191) NULL,
    MODIFY `designation` VARCHAR(191) NULL,
    MODIFY `marital_status` VARCHAR(191) NULL,
    MODIFY `sudo_name` VARCHAR(191) NULL,
    MODIFY `zip_code` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `attendance` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `log_in` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `log_out` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `employee_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `breaks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `break_start` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `break_end` TIMESTAMP(0) NULL,
    `attendanceId` INTEGER UNSIGNED NULL,

    INDEX `Break_attendanceId_fkey`(`attendanceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_employee_id_key` ON `users`(`employee_id`);

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_attendees_attendee_id_fkey` FOREIGN KEY (`attendee_id`) REFERENCES `users`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `Attendance_user_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `users`(`employee_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `breaks` ADD CONSTRAINT `Break_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `attendance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
