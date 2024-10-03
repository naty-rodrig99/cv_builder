// src/app/profile/page.tsx

import ProfileForm from "./profile-form";

export default async function ProfilePage() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-background px-4">
      <div>
        <ProfileForm />
      </div>
    </main>
  );
}
