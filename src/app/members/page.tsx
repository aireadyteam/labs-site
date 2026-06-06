import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function MembersPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/join');
  }

  // Pass user email into the dashboard via query param for personalisation
  const email = encodeURIComponent(user.email ?? '');

  return (
    <iframe
      src={`/portal/member-dashboard.html?email=${email}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        zIndex: 9999,
      }}
      title="LABS Member Portal"
    />
  );
}
