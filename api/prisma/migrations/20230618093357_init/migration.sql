-- CreateTable
CREATE TABLE `Bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `accountType` ENUM('Checking') NOT NULL,
    `startingBalance` DOUBLE NOT NULL,
    `minBalanceWarning` DOUBLE NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
