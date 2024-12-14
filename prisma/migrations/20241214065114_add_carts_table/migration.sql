-- CreateTable
CREATE TABLE `activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `img_url` TEXT NULL,
    `location` TEXT NOT NULL,
    `host_id` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `max_participants` INTEGER NOT NULL,
    `min_participants` INTEGER NOT NULL,
    `category` ENUM('food', 'shopping', 'travel', 'sports', 'education', 'others') NOT NULL,
    `status` ENUM('registrationOpen', 'onGoing', 'completed', 'cancelled') NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `pay_type` ENUM('free', 'AA', 'host') NOT NULL,
    `require_approval` TINYINT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `approval_deadline` DATETIME(0) NULL,
    `event_time` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `host_idanduid_idx`(`host_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `uid` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `full_name` VARCHAR(255) NOT NULL,
    `display_name` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(10) NOT NULL,
    `photo_url` TEXT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `city` VARCHAR(5) NULL,
    `age` INTEGER NULL,
    `career` VARCHAR(45) NULL,
    `favorite_sentence` VARCHAR(45) NULL,
    `tags` VARCHAR(255) NULL,
    `self_introduction` VARCHAR(45) NULL,
    `zodiac` VARCHAR(3) NULL,
    `hobby` VARCHAR(45) NULL,
    `expertise` VARCHAR(45) NULL,
    `interested_in` VARCHAR(255) NULL,
    `life_photo_1` TEXT NULL,
    `life_photo_2` TEXT NULL,

    UNIQUE INDEX `uid_UNIQUE`(`uid`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applications` (
    `application_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `activity_id` INTEGER NOT NULL,
    `participant_id` VARCHAR(255) NOT NULL,
    `status` ENUM('registered', 'approved', 'host_declined', 'participant_cancelled') NOT NULL DEFAULT 'registered',
    `comment` VARCHAR(50) NULL,

    UNIQUE INDEX `id_UNIQUE`(`application_id`),
    INDEX `participants_ibfk_2`(`participant_id`),
    PRIMARY KEY (`activity_id`, `participant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `followers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `follower_id` VARCHAR(255) NOT NULL,
    `follow_status` ENUM('following', 'unfollow', 'blocked') NOT NULL DEFAULT 'following',

    UNIQUE INDEX `id_UNIQUE`(`id`),
    INDEX `bind follower id_idx`(`follower_id`),
    INDEX `bind user id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ratings` (
    `rating_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `host_id` VARCHAR(255) NOT NULL,
    `rating_heart` INTEGER NOT NULL,
    `user_comment` TEXT NOT NULL,
    `rating_kindness` INTEGER NOT NULL,
    `rating_ability` INTEGER NOT NULL,
    `rating_credit` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `rating_id_UNIQUE`(`rating_id`),
    INDEX `bind host id_idx`(`host_id`),
    INDEX `bind id_idx`(`user_id`),
    PRIMARY KEY (`rating_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity_comments` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `activity_id` INTEGER NOT NULL,
    `user_comment` VARCHAR(50) NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('posted', 'deleted') NOT NULL DEFAULT 'posted',

    UNIQUE INDEX `comment_id_UNIQUE`(`comment_id`),
    INDEX `FK_ac_activities_idx`(`activity_id`),
    INDEX `FK_ac_users_idx`(`uid`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_comments` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `comment_content` TEXT NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `status` ENUM('active', 'deleted') NOT NULL,

    INDEX `FK_postComments_users-postid_idx`(`post_id`),
    INDEX `FK_postComments_users_idx`(`uid`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `post_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_title` VARCHAR(10) NOT NULL,
    `post_content` TEXT NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `post_category` ENUM('food', 'shopping', 'travel', 'sports', 'education', 'others') NOT NULL,
    `post_status` ENUM('onEdit', 'posted', 'deleted') NOT NULL,
    `post_img` TEXT NULL,

    INDEX `FK_posts_users-uid_idx`(`uid`),
    PRIMARY KEY (`post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_likes` (
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `uid` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`like_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `carts_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_id` INTEGER NOT NULL,
    `activity_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `carts_comments_cart_id_activity_id_idx`(`cart_id`, `activity_id`),
    INDEX `carts_comments_activity_id_fkey`(`activity_id`),
    UNIQUE INDEX `carts_comments_cart_id_activity_id_key`(`cart_id`, `activity_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `12` FOREIGN KEY (`host_id`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`participant_id`) REFERENCES `users`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers bind follower id` FOREIGN KEY (`follower_id`) REFERENCES `users`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers bind user id` FOREIGN KEY (`user_id`) REFERENCES `users`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `bind host id` FOREIGN KEY (`host_id`) REFERENCES `users`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `bind user id` FOREIGN KEY (`user_id`) REFERENCES `users`(`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_comments` ADD CONSTRAINT `FK_ac_activities` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activity_comments` ADD CONSTRAINT `FK_ac_users` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_comments` ADD CONSTRAINT `FK_postComments_users` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post_comments` ADD CONSTRAINT `FK_postComments_users-postid` FOREIGN KEY (`post_id`) REFERENCES `posts`(`post_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `FK_posts_users-uid` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts_comments` ADD CONSTRAINT `carts_comments_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts_comments` ADD CONSTRAINT `carts_comments_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
