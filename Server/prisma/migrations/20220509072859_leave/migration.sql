-- CreateTable
CREATE TABLE `employee_leaves` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(255) NOT NULL,
    `leave_status` ENUM('pending', 'completed', 'rejected', '') NOT NULL,
    `leave_dates` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
