-- CreateTable
CREATE TABLE `employee_complants_advices_suggestions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(255) NOT NULL,
    `create_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `message` LONGTEXT NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', '') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
