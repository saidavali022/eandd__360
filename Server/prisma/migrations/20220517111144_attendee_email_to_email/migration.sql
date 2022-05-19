/*
  Warnings:

  - You are about to drop the column `attendee_email` on the `event_attendees` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event_attendees` DROP COLUMN `attendee_email`,
    ADD COLUMN `email` VARCHAR(191) NULL;
