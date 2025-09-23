import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

async function getUpcomingEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data || []
}

async function getPastEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .lt('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching past events:', error)
    return []
  }
  return data || []
}

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents()
  ])

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Events</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join our exciting events and connect with like-minded people in our community.
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No upcoming events scheduled</p>
              <p className="text-gray-500">Check back later for new events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="card hover:bg-gray-800/50 transition-colors group">
                  {event.banner_image && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={event.banner_image}
                        alt={event.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold group-hover:text-primary-400 transition-colors">
                      <Link href={`/events/${event.id}`}>
                        {event.name}
                      </Link>
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <Calendar size={16} className="mr-2" />
                        {new Date(event.event_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={16} className="mr-2" />
                        {event.event_time}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users size={16} className="mr-2" />
                        {event.current_attendees} / {event.max_attendees || '∞'} attendees
                      </div>
                    </div>
                    <Link 
                      href={`/events/${event.id}`}
                      className="btn-primary w-full text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="card opacity-75">
                  {event.banner_image && (
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={event.banner_image}
                        alt={event.name}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-400">
                      {event.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        {new Date(event.event_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users size={16} className="mr-2" />
                        {event.current_attendees} attendees
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
