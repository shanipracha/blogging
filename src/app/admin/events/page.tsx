import Link from 'next/link'
import { Plus, Edit, Trash2, Calendar, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'

async function getEvents() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data || []
}

export default async function AdminEventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Events</h1>
            <p className="text-gray-400">Manage your events and activities</p>
          </div>
          <Link href="/admin/events/new" className="btn-primary flex items-center space-x-2">
            <Plus size={18} />
            <span>New Event</span>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Calendar className="mx-auto text-gray-600 mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">No events yet</h3>
              <p className="text-gray-400 mb-4">Create your first event to get started</p>
              <Link href="/admin/events/new" className="btn-primary">
                Create Event
              </Link>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="card hover:bg-gray-800/50 transition-colors">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{event.description}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      {new Date(event.event_date).toLocaleDateString()} at {event.event_time}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users size={16} className="mr-2" />
                      {event.current_attendees} / {event.max_attendees || '∞'} attendees
                    </div>
                    <div className="text-gray-500">
                      📍 {event.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/events/${event.id}`}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="View Event"
                      >
                        <Calendar size={16} />
                      </Link>
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                        title="Edit Event"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        className="text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      new Date(event.event_date) >= new Date()
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {new Date(event.event_date) >= new Date() ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
