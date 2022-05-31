-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coffee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "roaster" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Coffee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Coffee" ("createdAt", "id", "name", "roaster", "updatedAt", "userId") SELECT "createdAt", "id", "name", "roaster", "updatedAt", "userId" FROM "Coffee";
DROP TABLE "Coffee";
ALTER TABLE "new_Coffee" RENAME TO "Coffee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
