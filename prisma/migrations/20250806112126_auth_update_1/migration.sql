-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" VARCHAR(255),
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
