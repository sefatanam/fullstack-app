/*
  Warnings:

  - Added the required column `videoUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDisable" BOOLEAN NOT NULL DEFAULT false,
    "videoUrl" TEXT NOT NULL
);
INSERT INTO "new_Product" ("createdAt", "description", "id", "image", "isDisable", "name", "price", "updatedAt") SELECT "createdAt", "description", "id", "image", "isDisable", "name", "price", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
