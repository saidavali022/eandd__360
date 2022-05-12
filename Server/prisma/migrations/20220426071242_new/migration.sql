/*
  Warnings:

  - The values [accepted,rejected] on the enum `feedback_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `feedback` MODIFY `fed_question_1` TEXT NOT NULL,
    MODIFY `fed_question_2` TEXT NOT NULL,
    MODIFY `fed_question_3` TEXT NOT NULL,
    MODIFY `fed_question_4` TEXT NOT NULL,
    MODIFY `fed_question_5` TEXT NOT NULL,
    MODIFY `fed_question_6` TEXT NOT NULL,
    MODIFY `fed_question_7` TEXT NOT NULL,
    MODIFY `fed_question_8` TEXT NOT NULL,
    MODIFY `fed_question_9` TEXT NOT NULL,
    MODIFY `fed_question_10` TEXT NOT NULL,
    MODIFY `fed_question_11` TEXT NOT NULL,
    MODIFY `status` ENUM('pending', 'send', '') NOT NULL;
