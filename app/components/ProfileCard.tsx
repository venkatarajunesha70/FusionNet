type ProfileInfo = {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  jobTitle: string;
  company: string;
  followers: number;
  following: number;
  profileViews: number;
};

const profile: ProfileInfo = {
  firstName: "Julia",
  lastName: "Park",
  email: "julia.park@fusionnet.com",
  location: "San Francisco, CA",
  jobTitle: "Product Manager",
  company: "FusionNet",
  followers: 248,
  following: 180,
  profileViews: 1789,
};

export function ProfileCard() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </div>
          <div>
            <p className="text-xl font-semibold text-slate-900">{profile.firstName} {profile.lastName}</p>
            <p className="text-sm text-slate-500">{profile.jobTitle} · {profile.company}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
          <div>
            <p className="font-semibold text-slate-900">Followers</p>
            <p className="mt-1">{profile.followers}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Following</p>
            <p className="mt-1">{profile.following}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Views</p>
            <p className="mt-1">{profile.profileViews}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Location</p>
            <p className="mt-1">{profile.location}</p>
          </div>
        </div>

        <div className="space-y-2 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          <p><span className="font-semibold text-slate-900">Email:</span> {profile.email}</p>
          <p><span className="font-semibold text-slate-900">Company:</span> {profile.company}</p>
          <p><span className="font-semibold text-slate-900">Job title:</span> {profile.jobTitle}</p>
        </div>
      </div>
    </div>
  );
}
