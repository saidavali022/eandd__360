/*
  Warnings:

  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `events` table. All the data in the column will be lost.
  - You are about to alter the column `event_id` on the `events` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `created_by` on the `events` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `event_attendees` DROP FOREIGN KEY `event_to_attendees`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_created_by_fkey`;

-- DropIndex
DROP INDEX `id` ON `events`;

-- AlterTable
ALTER TABLE `events` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `event_id` VARCHAR(191) NOT NULL,
    MODIFY `created_by` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`event_id`);

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
