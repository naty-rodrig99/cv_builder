// src/app/profile/page.tsx

import { fetchUser } from "./actions";
import ProfileForm from "../../components/cv/elements/profile-element/profile-form";

export default async function ProfilePage() {
  const result = await fetchUser();
  if (!result.ok) {
    throw new Error("Profile Data Failed");
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-background px-4">
      <div>
        <ProfileForm profileData={result.value} />
      </div>
    </main>
  );
}
