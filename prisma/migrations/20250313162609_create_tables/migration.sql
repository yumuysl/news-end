-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `nickname` VARCHAR(50) NULL DEFAULT '番茄用户',
    `password` TEXT NOT NULL,
    `avatar` JSON NULL,
    `email` VARCHAR(50) NULL,
    `mobile` VARCHAR(50) NULL,
    `status` ENUM('0', '1') NULL DEFAULT '1',
    `ban_start` DATETIME(0) NULL,
    `ban_end` DATETIME(0) NULL,
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `create_time` DATETIME(0) NOT NULL,
    `update_time` DATETIME(0) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NULL,
    `content` LONGTEXT NULL,
    `author` INTEGER UNSIGNED NOT NULL,
    `category` INTEGER NOT NULL,
    `status` ENUM('0', '1', '2', '3') NOT NULL DEFAULT '0',
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `create_time` DATETIME(0) NOT NULL,
    `update_time` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `news__user`(`author`),
    INDEX `news_news_category`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `create_time` DATETIME(0) NOT NULL,
    `update_time` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `from_author` INTEGER UNSIGNED NOT NULL,
    `target_author` INTEGER UNSIGNED NOT NULL,
    `father_comment_id` INTEGER NOT NULL,
    `news` INTEGER UNSIGNED NOT NULL,
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `create_time` DATETIME(0) NOT NULL,
    `update_time` DATETIME(0) NOT NULL,

    INDEX `comment__news`(`news`),
    INDEX `comment_from__user`(`from_author`),
    INDEX `comment_target__user`(`target_author`),
    UNIQUE INDEX `id`(`id`, `father_comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `like` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `from_author` INTEGER UNSIGNED NOT NULL,
    `target_author` INTEGER UNSIGNED NOT NULL,
    `news` INTEGER UNSIGNED NOT NULL,
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `create_time` DATETIME(0) NOT NULL,
    `update_time` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `FK_like_article`(`news`),
    INDEX `like_from__user`(`from_author`),
    INDEX `like_target__user`(`target_author`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(50) NULL,
    `auth_list` JSON NOT NULL,
    `is_active` ENUM('0', '1') NOT NULL DEFAULT '1',
    `create_time` DATETIME(0) NOT NULL,
    `update_time` DATETIME(0) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `news__user` FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `news_news_category` FOREIGN KEY (`category`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment__news` FOREIGN KEY (`news`) REFERENCES `article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_from__user` FOREIGN KEY (`from_author`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_target__user` FOREIGN KEY (`target_author`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `FK_like_article` FOREIGN KEY (`news`) REFERENCES `article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_from__user` FOREIGN KEY (`from_author`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_target__user` FOREIGN KEY (`target_author`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
