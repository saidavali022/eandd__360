-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feed_from_id` INTEGER NOT NULL DEFAULT 1,
    `employee_id` VARCHAR(255) NOT NULL,
    `fed_question_1` INTEGER NOT NULL,
    `fed_question_2` INTEGER NOT NULL,
    `fed_question_3` INTEGER NOT NULL,
    `fed_question_4` INTEGER NOT NULL,
    `fed_question_5` INTEGER NOT NULL,
    `fed_question_6` INTEGER NOT NULL,
    `fed_question_7` INTEGER NOT NULL,
    `fed_question_8` INTEGER NOT NULL,
    `fed_question_9` INTEGER NOT NULL,
    `fed_question_10` INTEGER NOT NULL,
    `fed_question_11` INTEGER NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', '') NOT NULL,
    `create_at` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `id`(`id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback_questions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feed_from_id` INTEGER NOT NULL DEFAULT 1,
    `feed_quasion_id` INTEGER NOT NULL,
    `question` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
