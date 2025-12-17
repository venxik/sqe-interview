-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "loans" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" VARCHAR(255) NOT NULL,
    "mrp" INTEGER NOT NULL,
    "dp" INTEGER NOT NULL,
    "vehicle_year" INTEGER NOT NULL,
    "police_number" VARCHAR(50) NOT NULL,
    "machine_number" VARCHAR(100) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'submitted',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_loans_status" ON "loans"("status");

-- CreateIndex
CREATE INDEX "idx_loans_user_id" ON "loans"("user_id");

-- CreateIndex
CREATE INDEX "idx_loans_user_id_police_number" ON "loans"("user_id", "police_number");
