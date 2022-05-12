-- CreateTable
CREATE TABLE `employee_resignation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(191) NOT NULL,
    `reason` LONGTEXT NOT NULL,
    `create_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATE NOT NULL,
    `start_date` DATE NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', '') NOT NULL,

    INDEX `id`(`id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
