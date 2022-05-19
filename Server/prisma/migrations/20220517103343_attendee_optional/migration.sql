-- DropForeignKey
ALTER TABLE `event_attendees` DROP FOREIGN KEY `event_attendees_attendee_id_fkey`;

-- AlterTable
ALTER TABLE `event_attendees` ADD COLUMN `attendee_email` VARCHAR(191) NULL,
    MODIFY `attendee_id` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_attendees_attendee_id_fkey` FOREIGN KEY (`attendee_id`) REFERENCES `users`(`employee_id`) ON DELETE SET NULL ON UPDATE CASCADE;
