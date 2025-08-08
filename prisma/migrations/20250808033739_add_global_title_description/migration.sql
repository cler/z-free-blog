/*
  Warnings:

  - You are about to drop the column `createdBy` on the `homepage_configs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[configName]` on the table `homepage_configs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."homepage_configs" DROP CONSTRAINT "homepage_configs_createdBy_fkey";

-- AlterTable
ALTER TABLE "public"."homepage_configs" DROP COLUMN "createdBy",
ADD COLUMN     "configName" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "globalDescription" TEXT,
ADD COLUMN     "globalTitle" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "homepage_configs_configName_key" ON "public"."homepage_configs"("configName");
