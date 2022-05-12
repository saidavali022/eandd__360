-- CreateTable
CREATE TABLE `checklists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `id_card` BOOLEAN NOT NULL,
    `cell_phone` BOOLEAN NOT NULL,
    `laptop` BOOLEAN NOT NULL,
    `files` BOOLEAN NOT NULL,
    `key_s` BOOLEAN NOT NULL,
    `check_status` ENUM('pending', 'completed', '') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
