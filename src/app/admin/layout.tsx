import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import AdminNavigation from '@/components/AdminNavigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-black">
      <AdminNavigation />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
