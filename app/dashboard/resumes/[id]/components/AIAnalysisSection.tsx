"use client";

import { useState, useTransition } from "react";
import type { ResumeAIOutput } from "../../../../../lib/ai/schemas";
import { analyzeResumeAction } from "../actions";

type AIAnalysisSectionProps = {
  resumeId: string;
  initialAnalysis: ResumeAIOutput | null;
};

export default function AIAnalysisSection({
  resumeId,
  initialAnalysis,
}: AIAnalysisSectionProps) {
  const [result, setResult] =
    useState<ResumeAIOutput | null>(initialAnalysis);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleAnalyze() {
    setError(null);

    startTransition(async () => {
      try {
        const analysis = await analyzeResumeAction(resumeId);
        setResult(analysis);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to analyze resume."
        );
      }
    });
  }

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            AI Analysis
          </h2>

          <p className="text-sm text-gray-600">
            Get AI-powered feedback on your resume.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isPending}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-medium text-gray-500">
                Overall Score
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-900">
                {result.overallScore}
                <span className="text-lg font-medium text-gray-400">
                  {" "}
                  / 100
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-medium text-gray-500">
                Target Position Fit
              </p>

              <p className="mt-2 text-4xl font-bold text-gray-900">
                {result.targetPositionFit.score}
                <span className="text-lg font-medium text-gray-400">
                  {" "}
                  / 100
                </span>
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {result.targetPositionFit.summary}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Strengths
            </h3>

            <div className="mt-4 space-y-3">
              {result.strengths.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No strengths identified.
                </p>
              ) : (
                result.strengths.map((strength, index) => (
                  <div
                    key={`${strength.title}-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <h4 className="font-medium text-gray-900">
                      {strength.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {strength.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Weaknesses
            </h3>

            <div className="mt-4 space-y-3">
              {result.weaknesses.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No weaknesses identified.
                </p>
              ) : (
                result.weaknesses.map((weakness, index) => (
                  <div
                    key={`${weakness.title}-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <h4 className="font-medium text-gray-900">
                      {weakness.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {weakness.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Skills Gap
            </h3>

            <div className="mt-4 space-y-3">
              {result.skillsGap.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No skill gaps identified.
                </p>
              ) : (
                result.skillsGap.map((gap, index) => (
                  <div
                    key={`${gap.skill}-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="font-medium text-gray-900">
                        {gap.skill}
                      </h4>

                      <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase text-gray-600">
                        {gap.importance}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {gap.reason}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Experience Feedback
            </h3>

            <div className="mt-4 space-y-3">
              {result.experienceFeedback.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No experience feedback available.
                </p>
              ) : (
                result.experienceFeedback.map((experience, index) => (
                  <div
                    key={`${experience.experience}-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="font-medium text-gray-900">
                        {experience.experience}
                      </h4>

                      <span className="text-sm font-semibold text-gray-900">
                        {experience.score} / 100
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {experience.feedback}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Improvement Suggestions
            </h3>

            <div className="mt-4 space-y-3">
              {result.improvementSuggestions.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No improvement suggestions available.
                </p>
              ) : (
                result.improvementSuggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.area}-${index}`}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="font-medium text-gray-900">
                        {suggestion.area}
                      </h4>

                      <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase text-gray-600">
                        {suggestion.priority}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {suggestion.suggestion}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
