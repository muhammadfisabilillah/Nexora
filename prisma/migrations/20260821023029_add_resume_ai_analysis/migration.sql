-- CreateTable
CREATE TABLE "ResumeAIAnalysis" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "targetPositionFit" JSONB NOT NULL,
    "strengths" JSONB NOT NULL,
    "weaknesses" JSONB NOT NULL,
    "skillsGap" JSONB NOT NULL,
    "experienceFeedback" JSONB NOT NULL,
    "improvementSuggestions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumeAIAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ResumeAIAnalysis_resumeId_idx" ON "ResumeAIAnalysis"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumeAIAnalysis" ADD CONSTRAINT "ResumeAIAnalysis_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
