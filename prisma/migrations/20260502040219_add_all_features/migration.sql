/*
  Warnings:

  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- AlterTable
ALTER TABLE "comment_cache" ADD COLUMN     "author_channel_id" TEXT,
ADD COLUMN     "parent_comment_id" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verified",
ADD COLUMN     "channel_id" TEXT,
ADD COLUMN     "data_saver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notify_bookmarks" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notify_dislikes" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notify_likes" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notify_replies" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "push_notify_bookmarks" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "push_notify_dislikes" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "push_notify_likes" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "push_notify_mentions" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "push_notify_replies" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "show_bookmarks_tab" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "show_dislikes_tab" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "show_likes_tab" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "verificationtokens";

-- CreateTable
CREATE TABLE "bookmarks" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "folder_id" TEXT,
    "comment_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_thumb" TEXT,
    "content" TEXT NOT NULL,
    "like_count" TEXT NOT NULL,
    "reply_count" TEXT NOT NULL,
    "published_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lists" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_items" (
    "id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_thumb" TEXT,
    "content" TEXT NOT NULL,
    "like_count" TEXT NOT NULL,
    "reply_count" TEXT NOT NULL,
    "published_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list_follows" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "list_follows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmark_folders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmark_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocked_users" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "channel_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocked_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muted_users" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "channel_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "muted_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muted_words" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'partial',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "muted_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ogp_cache" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,
    "site_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ogp_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_posts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "posted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduled_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "actor_name" TEXT NOT NULL,
    "actor_channel_id" TEXT,
    "actor_thumb" TEXT,
    "comment_id" TEXT,
    "video_id" TEXT NOT NULL,
    "content" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_settings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "preference" TEXT NOT NULL DEFAULT 'all',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "push_subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bookmarks_user_id_created_at_idx" ON "bookmarks"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "bookmarks_folder_id_idx" ON "bookmarks"("folder_id");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_user_id_comment_id_key" ON "bookmarks"("user_id", "comment_id");

-- CreateIndex
CREATE INDEX "lists_user_id_idx" ON "lists"("user_id");

-- CreateIndex
CREATE INDEX "lists_is_public_idx" ON "lists"("is_public");

-- CreateIndex
CREATE INDEX "list_items_list_id_created_at_idx" ON "list_items"("list_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "list_items_list_id_comment_id_key" ON "list_items"("list_id", "comment_id");

-- CreateIndex
CREATE INDEX "list_follows_user_id_idx" ON "list_follows"("user_id");

-- CreateIndex
CREATE INDEX "list_follows_list_id_idx" ON "list_follows"("list_id");

-- CreateIndex
CREATE UNIQUE INDEX "list_follows_user_id_list_id_key" ON "list_follows"("user_id", "list_id");

-- CreateIndex
CREATE INDEX "bookmark_folders_user_id_idx" ON "bookmark_folders"("user_id");

-- CreateIndex
CREATE INDEX "blocked_users_user_id_idx" ON "blocked_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blocked_users_user_id_channel_id_key" ON "blocked_users"("user_id", "channel_id");

-- CreateIndex
CREATE INDEX "muted_users_user_id_idx" ON "muted_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "muted_users_user_id_channel_id_key" ON "muted_users"("user_id", "channel_id");

-- CreateIndex
CREATE INDEX "muted_words_user_id_idx" ON "muted_words"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "muted_words_user_id_word_key" ON "muted_words"("user_id", "word");

-- CreateIndex
CREATE UNIQUE INDEX "ogp_cache_url_key" ON "ogp_cache"("url");

-- CreateIndex
CREATE INDEX "scheduled_posts_posted_scheduled_at_idx" ON "scheduled_posts"("posted", "scheduled_at");

-- CreateIndex
CREATE INDEX "scheduled_posts_user_id_idx" ON "scheduled_posts"("user_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_is_read_idx" ON "notifications"("user_id", "is_read");

-- CreateIndex
CREATE INDEX "notifications_user_id_created_at_idx" ON "notifications"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "notifications_user_id_type_idx" ON "notifications"("user_id", "type");

-- CreateIndex
CREATE INDEX "notification_settings_user_id_idx" ON "notification_settings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "notification_settings_user_id_channel_id_key" ON "notification_settings"("user_id", "channel_id");

-- CreateIndex
CREATE INDEX "push_subscriptions_user_id_idx" ON "push_subscriptions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "push_subscriptions_user_id_endpoint_key" ON "push_subscriptions"("user_id", "endpoint");

-- CreateIndex
CREATE INDEX "comment_cache_video_id_published_at_idx" ON "comment_cache"("video_id", "published_at");

-- CreateIndex
CREATE INDEX "comment_cache_author_channel_id_idx" ON "comment_cache"("author_channel_id");

-- CreateIndex
CREATE INDEX "comment_cache_parent_comment_id_idx" ON "comment_cache"("parent_comment_id");

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "bookmark_folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_follows" ADD CONSTRAINT "list_follows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_follows" ADD CONSTRAINT "list_follows_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark_folders" ADD CONSTRAINT "bookmark_folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocked_users" ADD CONSTRAINT "blocked_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muted_users" ADD CONSTRAINT "muted_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muted_words" ADD CONSTRAINT "muted_words_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_settings" ADD CONSTRAINT "notification_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
