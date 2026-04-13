import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Sparkles, TrendingUp, Users, Zap, ArrowRight, Star, CheckCircle, Video, Filter, Search, Share2, Eye, Lightbulb, Rocket, Award, Clock, BarChart3, Headphones } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('trending')

  const allVideos = Array.from({ length: 80 }, (_, i) => {
    const categories = ['Tech', 'Fashion', 'Food', 'Business', 'Lifestyle', 'Travel', 'Education', 'Entertainment']
    const category = categories[i % categories.length]
    const views = Math.floor(Math.random() * 500000) + 5000
    const rating = (Math.random() * 2 + 3.5).toFixed(1)
    return {
      id: i + 1,
      title: `${category} Video #${i + 1}`,
      category,
      views,
      rating,
      likes: Math.floor(views * 0.1),
      duration: `${Math.floor(Math.random() * 4) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      creator: `Creator ${Math.floor(i / 10) + 1}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }
  })

  const filteredVideos = useMemo(() => {
    let filtered = allVideos
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(v => v.category === selectedCategory)
    }
    if (searchQuery) {
      filtered = filtered.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (sortBy === 'trending') {
      filtered.sort((a, b) => b.views - a.views)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  const categories = ['All', 'Tech', 'Fashion', 'Food', 'Business', 'Lifestyle', 'Travel', 'Education', 'Entertainment']

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Video size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Mentneo AI</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/login')} className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition">User Login</button>
            <button onClick={() => navigate('/telecaller-login')} className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition">Telecaller</button>
            <button onClick={() => navigate('/video-creator-login')} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition">Creator Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-full">
                <Sparkles size={16} className="text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">AI-Powered Video Creation</span>
              </div>
              <h1 className="text-6xl font-black text-gray-900 leading-tight">Create Professional Videos in <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Minutes</span></h1>
              <p className="text-xl text-gray-600">Transform your ideas into stunning, professional videos with our AI platform. No experience needed. Join 5000+ businesses.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/login')} className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
                Get Started Free <ArrowRight size={20} />
              </button>
              <button onClick={() => document.getElementById('videos').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-xl font-bold hover:border-gray-400 transition flex items-center justify-center gap-2">
                <Play size={20} />
                Watch Examples
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { label: 'Videos Created', value: '10,000+' },
                { label: 'Active Creators', value: '1,000+' },
                { label: 'Happy Clients', value: '5,000+' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-purple-600">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl p-12 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6">
                <Play size={48} className="text-white ml-2" />
              </div>
              <p className="text-4xl font-black text-gray-900">80+</p>
              <p className="text-gray-600 text-lg">Example Videos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Why Choose Mentneo AI?</h2>
            <p className="text-xl text-gray-600">Everything you need to create professional videos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Create videos in minutes, not hours', stat: '10x Faster' },
              { icon: TrendingUp, title: 'Boost Engagement', desc: 'AI-optimized videos that convert', stat: '45% Engagement' },
              { icon: Users, title: 'Expert Network', desc: '1000+ professional video creators', stat: '1000+ Creators' },
              { icon: Award, title: 'Premium Quality', desc: 'Hollywood-grade production', stat: '4.8★ Rating' },
              { icon: Clock, title: 'Quick Turnaround', desc: 'Get your video in 6-24 hours', stat: '24hr Delivery' },
              { icon: BarChart3, title: 'Analytics', desc: 'Track performance and engagement', stat: 'Real-time Stats' },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-300 hover:shadow-lg transition">
                  <Icon size={32} className="text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.desc}</p>
                  <p className="text-sm font-semibold text-purple-600">{feature.stat}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple 4-step process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'Create Request', desc: 'Tell us about your video idea and goals', icon: Lightbulb },
            { num: '2', title: 'Expert Review', desc: 'Our team reviews and confirms details', icon: CheckCircle },
            { num: '3', title: 'Video Creation', desc: 'Professional creators produce your video', icon: Rocket },
            { num: '4', title: 'Get Video', desc: 'Download and use your professional video', icon: Play },
          ].map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-purple-300 transition">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-white">{step.num}</span>
                </div>
                <Icon size={32} className="text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Videos */}
      <section id="videos" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Featured Videos</h2>
            <p className="text-xl text-gray-600">Explore professional videos created by our network</p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search videos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 text-gray-900" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg font-semibold transition ${selectedCategory === cat ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Filter size={20} className="text-gray-600 self-center" />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 text-gray-900 font-semibold">
                  <option value="trending">Trending</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredVideos.slice(0, 10).map((video) => (
              <div key={video.id} onClick={() => setSelectedVideo(video)} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-purple-600 hover:shadow-lg transition">
                <div className="h-40 bg-gray-200 flex items-center justify-center relative">
                  <Play size={32} className="text-gray-400" />
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">{video.category}</div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">{video.duration}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-900">{video.title}</h3>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>⭐ {video.rating}</span>
                    <span>{(video.views / 1000).toFixed(0)}K views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Real results from real businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Rajesh Kumar', role: 'E-commerce Owner', text: 'Mentneo AI helped us create 50+ product videos in 2 weeks. Our sales increased by 35%!', avatar: '👨‍💼' },
            { name: 'Priya Singh', role: 'Content Creator', text: 'The quality of videos is incredible. My followers grew from 10K to 100K in just 3 months.', avatar: '👩‍💼' },
            { name: 'Amit Patel', role: 'Marketing Manager', text: 'Best investment for our marketing team. Saves us 20 hours per week on video production.', avatar: '👨‍💻' },
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-300 transition">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Basic', price: '₹999', features: ['1 Video', 'Basic Editing', '24hr Delivery', 'Email Support', 'HD Quality'] },
              { name: 'Standard', price: '₹2,499', features: ['3 Videos', 'Advanced Editing', '12hr Delivery', 'Priority Support', '4K Quality', 'Analytics'], popular: true },
              { name: 'Premium', price: '₹4,999', features: ['Unlimited Videos', 'Custom Editing', '6hr Delivery', '24/7 Support', '4K Quality', 'Advanced Analytics', 'Revisions'] },
            ].map((plan, idx) => (
              <div key={idx} className={`rounded-2xl p-8 transition ${plan.popular ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white scale-105 shadow-xl' : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-purple-300'}`}>
                {plan.popular && <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-bold mb-4">Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={plan.popular ? 'text-white/80' : 'text-gray-600'}>/video</span>
                </div>
                <button onClick={() => navigate('/login')} className={`w-full py-3 rounded-xl font-bold mb-8 transition ${plan.popular ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'}`}>
                  Get Started
                </button>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle size={16} className={plan.popular ? 'text-white' : 'text-green-600'} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { q: 'How long does it take to create a video?', a: 'Most videos are delivered within 6-24 hours depending on your plan and complexity.' },
            { q: 'Can I request revisions?', a: 'Yes! Premium plan includes unlimited revisions. Basic and Standard plans include 2 revisions.' },
            { q: 'What video formats do you support?', a: 'We support MP4, WebM, MOV, and more. We can also optimize for social media platforms.' },
            { q: 'Do I own the videos?', a: 'Yes! You own all videos created. You can use them commercially without restrictions.' },
            { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription anytime. No long-term contracts required.' },
            { q: 'What if I\'m not satisfied?', a: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll make it right.' },
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-300 transition">
              <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h4>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-white mb-4">Ready to Create?</h2>
          <p className="text-xl text-white/90 mb-8">Join 5000+ businesses creating professional videos with AI</p>
          <button onClick={() => navigate('/login')} className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2 mx-auto">
            Start Creating Now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Video size={20} />
                Mentneo AI
              </h3>
              <p className="text-gray-400 text-sm">Create professional videos with AI</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Mentneo AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <Play size={64} className="text-gray-400" />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedVideo.title}</h2>
              <div className="flex gap-4 mb-6 flex-wrap">
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-bold">{selectedVideo.category}</span>
                <span className="text-gray-600">⭐ {selectedVideo.rating}</span>
                <span className="text-gray-600">{(selectedVideo.views / 1000).toFixed(0)}K views</span>
              </div>
              <button onClick={() => setSelectedVideo(null)} className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
