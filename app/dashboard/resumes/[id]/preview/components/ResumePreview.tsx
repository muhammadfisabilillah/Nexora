import DefaultResumeTemplate from "../templates/DefaultResumeTemplate";

import { ResumePreviewData } from "../types/resume-preview";

type ResumePreviewProps = {
  resume: ResumePreviewData;
};

export default function ResumePreview({
  resume,
}: ResumePreviewProps) {
  return (
    <DefaultResumeTemplate resume={resume} />
  );
}