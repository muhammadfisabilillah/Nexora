export type ResumePreviewData = {
  id: string;
  title: string;

  profile: {
    fullName: string | null;
    headline: string | null;
    phone: string | null;
    location: string | null;
    website: string | null;
    summary: string | null;
  } | null;

  experiences: {
    id: string;
    company: string;
    position: string;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    current: boolean;
    description: string | null;
  }[];

  education: {
    id: string;
    institution: string;
    degree: string | null;
    fieldOfStudy: string | null;
    location: string | null;
    description: string | null;
  }[];

  skills: {
    id: string;
    name: string;
    level: string | null;
  }[];

  projects: {
    id: string;
    name: string;
    technologies: string | null;
    description: string | null;
    url: string | null;
  }[];
};