-- AlterTable
ALTER TABLE `admin` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `role` ENUM('admin', 'sub_admin') NOT NULL DEFAULT 'admin';
