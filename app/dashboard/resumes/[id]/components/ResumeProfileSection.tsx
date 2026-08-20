//ResumeProfileSection Component//
type ResumeProfileSectionProps = {
  profile: {
    fullName: string | null;
    headline: string | null;
    phone: string | null;
    location: string | null;
    website: string | null;
    summary: string | null;
  } | null;
  updateProfile: (formData: FormData) => void | Promise<void>;
};

export default function ResumeProfileSection({
  profile,
  updateProfile,
}: ResumeProfileSectionProps) {
  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900">
        Resume Profile
      </h2>

      <form action={updateProfile}>
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={profile?.fullName ?? ""}
            placeholder="e.g. Muhammad Fisabilillah"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="headline"
            className="block text-sm font-medium text-gray-700"
          >
            Professional Headline
          </label>

          <input
            id="headline"
            name="headline"
            type="text"
            defaultValue={profile?.headline ?? ""}
            placeholder="e.g. Information Systems Student"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={profile?.phone ?? ""}
            placeholder="e.g. +62..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            defaultValue={profile?.location ?? ""}
            placeholder="e.g. Bandung, Indonesia"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Website
          </label>

          <input
            id="website"
            name="website"
            type="url"
            defaultValue={profile?.website ?? ""}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700"
          >
            Professional Summary
          </label>

          <textarea
            id="summary"
            name="summary"
            rows={6}
            defaultValue={profile?.summary ?? ""}
            placeholder="Write a short professional summary..."
            className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>
    </section>
  );
}
