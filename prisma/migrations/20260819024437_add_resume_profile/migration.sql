-- CreateTable
CREATE TABLE "ResumeProfile" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "fullName" TEXT,
    "headline" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "website" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeProfile_resumeId_key" ON "ResumeProfile"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumeProfile" ADD CONSTRAINT "ResumeProfile_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
