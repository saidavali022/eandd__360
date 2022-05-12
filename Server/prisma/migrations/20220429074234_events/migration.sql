-- CreateTable
CREATE TABLE `event_attendees` (
    `id` INTEGER NOT NULL,
    `event_id` VARCHAR(255) NOT NULL,
    `attendee_id` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `event_to_attendees`(`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL,
    `event_id` VARCHAR(255) NOT NULL,
    `create_by` VARCHAR(255) NOT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_attendees` ADD CONSTRAINT `event_to_attendees` FOREIGN KEY (`event_id`) REFERENCES `events`(`event_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
