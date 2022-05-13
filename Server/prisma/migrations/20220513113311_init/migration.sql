/*
  Warnings:

  - The values [pendding] on the enum `task_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('pending', 'completed', 'started', '') NOT NULL;
