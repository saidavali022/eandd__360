-- DropForeignKey
ALTER TABLE `event_attendees` DROP FOREIGN KEY `event_attendees_event_id_fkey`;

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_attendees_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
