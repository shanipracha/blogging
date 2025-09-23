import { Settings, Save, User, Mail, Globe, Database } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Manage your site configuration and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Site Settings */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Globe className="text-primary-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Site Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  defaultValue="BlogHub"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Site Description</label>
                <textarea
                  defaultValue="Your ultimate destination for blogs and events"
                  className="input-field h-20 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Site URL</label>
                <input
                  type="url"
                  defaultValue="https://your-domain.vercel.app"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Contact Settings */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Mail className="text-primary-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Contact Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email</label>
                <input
                  type="email"
                  defaultValue="hello@bloghub.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <textarea
                  defaultValue="123 Blog Street, New York, NY 10001"
                  className="input-field h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="card">
            <div className="flex items-center mb-6">
              <User className="text-primary-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Social Media</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Facebook URL</label>
                <input
                  type="url"
                  placeholder="https://facebook.com/yourpage"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Twitter URL</label>
                <input
                  type="url"
                  placeholder="https://twitter.com/yourhandle"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Instagram URL</label>
                <input
                  type="url"
                  placeholder="https://instagram.com/yourhandle"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Database Info */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Database className="text-primary-400 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Database Information</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Blog Posts</h3>
                  <p className="text-2xl font-bold text-primary-400">0</p>
                  <p className="text-gray-400 text-sm">Total posts</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Events</h3>
                  <p className="text-2xl font-bold text-accent-400">0</p>
                  <p className="text-gray-400 text-sm">Total events</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Comments</h3>
                  <p className="text-2xl font-bold text-green-400">0</p>
                  <p className="text-gray-400 text-sm">Total comments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="btn-primary flex items-center space-x-2">
              <Save size={18} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
