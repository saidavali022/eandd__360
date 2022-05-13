/*
  Warnings:

  - You are about to drop the column `Blood_Group` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Department` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Designation` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Marital_Status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sudoName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `users` table. All the data in the column will be lost.
  - Added the required column `blood_group` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marital_status` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sudo_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `Blood_Group`,
    DROP COLUMN `Department`,
    DROP COLUMN `Designation`,
    DROP COLUMN `Marital_Status`,
    DROP COLUMN `firstname`,
    DROP COLUMN `lastname`,
    DROP COLUMN `sudoName`,
    DROP COLUMN `zipcode`,
    ADD COLUMN `blood_group` VARCHAR(191) NOT NULL,
    ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `designation` VARCHAR(191) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `marital_status` VARCHAR(191) NOT NULL,
    ADD COLUMN `sudo_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `zip_code` VARCHAR(191) NOT NULL;
