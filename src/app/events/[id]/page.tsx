import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

async function getEvent(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

async function getRelatedEvents(currentEventId: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('event_date', new Date().toISOString().split('T')[0])
    .neq('id', currentEventId)
    .order('event_date', { ascending: true })
    .limit(3)

  if (error) {
    console.error('Error fetching related events:', error)
    return []
  }
  return data || []
}

export default async function EventDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const event = await getEvent(params.id)

  if (!event) {
    notFound()
  }

  const relatedEvents = await getRelatedEvents(event.id)
  const isPastEvent = new Date(event.event_date) < new Date()

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/events" 
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Events
        </Link>

        {/* Event Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {event.name}
          </h1>
          
          <div className="flex items-center justify-between text-gray-400 mb-6">
            <div className="flex items-center space-x-6">
              <time dateTime={event.event_date} className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(event.event_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="flex items-center">
                <Clock size={16} className="mr-2" />
                {event.event_time}
              </span>
            </div>
            <button className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          </div>
        </header>

        {/* Banner Image */}
        {event.banner_image && (
          <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
            <Image
              src={event.banner_image}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <div 
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
          </div>

          {/* Event Info Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="text-primary-400 mt-1" size={18} />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(event.event_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="text-primary-400 mt-1" size={18} />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-400 text-sm">{event.event_time}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="text-primary-400 mt-1" size={18} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-400 text-sm">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="text-primary-400 mt-1" size={18} />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-gray-400 text-sm">
                      {event.current_attendees} / {event.max_attendees || '∞'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RSVP Button */}
            {!isPastEvent && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Join This Event</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {event.max_attendees && event.current_attendees >= event.max_attendees
                    ? 'This event is full'
                    : `${event.max_attendees ? event.max_attendees - event.current_attendees : '∞'} spots available`
                  }
                </p>
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    event.max_attendees && event.current_attendees >= event.max_attendees
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                  disabled={event.max_attendees && event.current_attendees >= event.max_attendees}
                >
                  {event.max_attendees && event.current_attendees >= event.max_attendees
                    ? 'Event Full'
                    : 'RSVP Now'
                  }
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Other Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <div key={relatedEvent.id} className="card hover:bg-gray-800/50 transition-colors">
                  {relatedEvent.banner_image && (
                    <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={relatedEvent.banner_image}
                        alt={relatedEvent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      <Link href={`/events/${relatedEvent.id}`} className="hover:text-primary-400 transition-colors">
                        {relatedEvent.name}
                      </Link>
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {relatedEvent.description}
                    </p>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2" />
                        {new Date(relatedEvent.event_date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2" />
                        {relatedEvent.location}
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

