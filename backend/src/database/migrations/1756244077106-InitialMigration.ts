import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756244077106 implements MigrationInterface {
    name = 'InitialMigration1756244077106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "description" character varying, "rewardValue" integer NOT NULL DEFAULT '0', "note" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sequenceNumber" SERIAL NOT NULL, "title" character varying, "description" character varying, "pointValue" integer DEFAULT '0', "category" character varying, "frequency" character varying, "difficulty" character varying, "status" character varying, "priority" character varying, "note" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assignedUserIds" text array DEFAULT '{}', CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, "taskId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_assignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "completed" boolean NOT NULL DEFAULT false, "assignedAt" TIMESTAMP, "completedAt" TIMESTAMP, "taskId" uuid, "userId" uuid, CONSTRAINT "PK_bbd5007caf5731217005cccdc0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP, "firstName" character varying, "birthDate" date, "bio" character varying, "statusEmoji" character varying DEFAULT '😀', "status" character varying DEFAULT 'Available', "theme" character varying NOT NULL, "avatarUrl" character varying NOT NULL, CONSTRAINT "PK_51cb79b5555effaf7d69ba1cff9" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_group_enum" AS ENUM('admin', 'parent', 'kid', 'guest')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "group" "public"."user_group_enum" NOT NULL DEFAULT 'guest', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "example" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "nickname" character varying NOT NULL, "description" character varying NOT NULL, "count" integer NOT NULL DEFAULT '0', "price" numeric(10,2) NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT false, "metadata" json DEFAULT '{"key":"value"}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_assignment" ADD CONSTRAINT "FK_a1a927f2586253f3dd5145e105f" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_assignment" ADD CONSTRAINT "FK_9b36540581f2d4b820cc481dc41" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_51cb79b5555effaf7d69ba1cff9"`);
        await queryRunner.query(`ALTER TABLE "task_assignment" DROP CONSTRAINT "FK_9b36540581f2d4b820cc481dc41"`);
        await queryRunner.query(`ALTER TABLE "task_assignment" DROP CONSTRAINT "FK_a1a927f2586253f3dd5145e105f"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`DROP TABLE "example"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_group_enum"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TABLE "task_assignment"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "reward"`);
    }

}
