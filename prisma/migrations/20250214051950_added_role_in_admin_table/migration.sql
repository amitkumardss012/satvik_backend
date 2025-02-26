/*
  Warnings:

  - Added the required column `role` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `role` ENUM('admin', 'sub_admin') NOT NULL;
