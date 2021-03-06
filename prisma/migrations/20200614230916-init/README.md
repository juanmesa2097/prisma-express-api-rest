# Migration `20200614230916-init`

This migration has been generated by juanmesa2097 at 6/14/2020, 11:09:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `viajes`.`Author` (
`email` varchar(191) NOT NULL  ,`id` int NOT NULL  AUTO_INCREMENT,`name` varchar(191)   ,`password` varchar(191) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `viajes`.`Post` (
`authorId` int NOT NULL ,`content` varchar(191)   ,`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,`id` int NOT NULL  AUTO_INCREMENT,`published` boolean NOT NULL DEFAULT false ,`title` varchar(191) NOT NULL  ,`updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `Author.email` ON `viajes`.`Author`(`email`)

CREATE  INDEX `authorId` ON `viajes`.`Post`(`authorId`)

ALTER TABLE `viajes`.`Post` ADD FOREIGN KEY (`authorId`) REFERENCES `viajes`.`Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200614230916-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,31 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Author {
+  id       Int     @default(autoincrement()) @id
+  email    String  @unique
+  password String
+  name     String?
+  Post     Post[]
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  title     String
+  content   String?
+  published Boolean  @default(false)
+  author    Author   @relation(fields: [authorId], references: [id])
+  authorId  Int
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  @@index([authorId], name: "authorId")
+}
```


