/*
  Warnings:

  - Added the required column `personId` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Animal` ADD COLUMN `personId` INTEGER NOT NULL,
    MODIFY `age` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Animal` ADD CONSTRAINT `Animal_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
