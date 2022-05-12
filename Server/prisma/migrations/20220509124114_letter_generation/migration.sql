/*
  Warnings:

  - The values [completed] on the enum `employee_leaves_leave_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `reason` to the `employee_leaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee_leaves` ADD COLUMN `reason` TEXT NOT NULL,
    MODIFY `leave_status` ENUM('pending', 'accepted', 'rejected', '') NOT NULL,
    MODIFY `leave_dates` VARCHAR(255) NOT NULL;
