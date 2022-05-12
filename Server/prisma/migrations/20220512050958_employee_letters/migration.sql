-- CreateTable
CREATE TABLE `employee_letters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` VARCHAR(255) NOT NULL,
    `letter_type` ENUM('probation', 'offer', 'increment', 'relieving', 'exprience', 'others') NOT NULL,
    `letter` VARCHAR(255) NOT NULL,
    `create_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
