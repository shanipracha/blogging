import { Users, Target, Heart, Award } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-gradient">BlogHub</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re passionate about creating a vibrant community where ideas flourish, 
            knowledge is shared, and connections are made through meaningful content and events.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="card">
            <div className="flex items-center mb-6">
              <Target className="text-primary-400 mr-3" size={32} />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At BlogHub, we believe in the power of storytelling and community. Our mission is to 
              provide a platform where writers, thinkers, and creators can share their insights, 
              experiences, and expertise with a global audience. We&apos;re committed to fostering 
              meaningful conversations and building bridges between people through quality content 
              and engaging events.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you&apos;re here to learn, share, or connect, BlogHub is your gateway to a world 
              of knowledge and inspiration. We curate the best content and organize events that 
              matter, creating opportunities for growth, learning, and meaningful connections.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-400">
                We&apos;re driven by our love for quality content and meaningful connections. 
                Every piece of content and every event is crafted with care and attention to detail.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-accent-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-accent-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-400">
                We believe in the strength of community. Our platform brings together diverse 
                voices and perspectives, creating a rich tapestry of ideas and experiences.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-400">
                We strive for excellence in everything we do. From content curation to event 
                organization, we maintain the highest standards to deliver exceptional experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="card">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                BlogHub was born from a simple idea: create a space where knowledge meets community. 
                Founded in 2024, we started as a small team of content enthusiasts who believed 
                that the best ideas deserve to be shared and the best conversations deserve to happen.
              </p>
              <p>
                What began as a passion project has grown into a thriving platform that connects 
                thousands of readers, writers, and event-goers worldwide. We&apos;ve hosted hundreds 
                of events, published thousands of articles, and built a community that continues 
                to inspire and educate.
              </p>
              <p>
                Today, BlogHub stands as a testament to the power of community-driven content. 
                We&apos;re proud to be a platform where voices are heard, ideas are celebrated, and 
                connections are made that last a lifetime.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">JS</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">John Smith</h3>
              <p className="text-primary-400 mb-3">Founder & CEO</p>
              <p className="text-gray-400 text-sm">
                Passionate about community building and content creation. 
                John leads our vision and strategy.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">MJ</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Maria Johnson</h3>
              <p className="text-primary-400 mb-3">Content Director</p>
              <p className="text-gray-400 text-sm">
                Maria curates our content and ensures every piece meets our 
                high standards for quality and relevance.
              </p>
            </div>

            <div className="card text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">DW</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">David Wilson</h3>
              <p className="text-primary-400 mb-3">Events Manager</p>
              <p className="text-gray-400 text-sm">
                David organizes our events and creates memorable experiences 
                that bring our community together.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="card bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-primary-500/30">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Ready to be part of something bigger? Join our community of writers, 
              readers, and event-goers who are shaping the future of content and connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="btn-primary text-lg px-8 py-3">
                Start Reading
              </Link>
              <Link href="/events" className="btn-secondary text-lg px-8 py-3">
                Join Events
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
