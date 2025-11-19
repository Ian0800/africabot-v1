import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Mpho K.",
      role: "Salon Owner, Gaborone, Botswana",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80",
      quote: "Since using AfricaBot, I don't have to stop cutting hair to answer 'how much?' anymore. My bookings have doubled because the bot works 24/7.",
      rating: 5
    },
    {
      name: "David O.",
      role: "Logistics, Lagos, Nigeria",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=100&q=80",
      quote: "The setup was fast and paying with my local card was easy. Now my drivers get locations automatically. Highly recommended!",
      rating: 5
    },
    {
      name: "Zola M.",
      role: "Boutique Owner, Nairobi, Kenya",
      image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=100&q=80",
      quote: "Great for my shop. Customers see my catalog on WhatsApp and order directly. I wake up to new orders every morning.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by African Businesses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join business owners across the continent who are saving time and growing with automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
              <Quote className="absolute top-8 right-8 text-emerald-100" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 relative z-10">"{review.quote}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};