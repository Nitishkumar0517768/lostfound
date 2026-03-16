import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  Bell, 
  Handshake, 
  Smartphone, 
  Wallet, 
  Key, 
  IdCard, 
  ShoppingBag, 
  Gem,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const images = [
    "https://media.collegedekho.com/media/img/institute/crawled_images/None/University%20Building.jru.jpg?width=1080",
    "https://d13loartjoc1yn.cloudfront.net/upload/library/1751509524parul-university-previous-year-question-papers.webp",
    "https://www.swaminarayanuniversity.ac.in/uploads/facility/6578a72779927be631162391ed25d5e9.webp"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 bg-[#F0FDF4] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold tracking-wide text-gray-800 bg-white rounded-full shadow-sm border border-emerald-100">
            welcome back
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F172A] mb-4">
            Campus Lost & <span className="text-[#10B981]">Found</span> System
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            Helping students recover lost belongings quickly and easily.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/items"
              className="w-full sm:w-auto px-10 py-4 bg-[#10B981] text-white font-bold rounded-xl shadow-lg hover:bg-[#059669] transition-all transform hover:-translate-y-1"
            >
              Browse Items
            </Link>
            <Link
              to="/post-item"
              className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-[#10B981] text-[#10B981] font-bold rounded-xl hover:bg-[#F0FDF4] transition-all transform hover:-translate-y-1"
            >
              Post Lost Item
            </Link>
          </div>
        </div>
        {/* Background blobs for premium feel */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-24 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-500 mb-16">Simple steps to reconnect with your belongings</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <UploadCloud size={32} className="text-blue-500" />,
                title: "Post Your Item",
                desc: "Whether you've lost something or found an item, easily create a listing with photos and details.",
                step: 1
              },
              {
                icon: <Bell size={32} className="text-blue-500" />,
                title: "Smart Matching",
                desc: "Our system automatically notifies you when an item matching your report is found.",
                step: 2
              },
              {
                icon: <Handshake size={32} className="text-blue-500" />,
                title: "Connect & Recover",
                desc: "Safely connect with the finder or owner and arrange to recover your belongings.",
                step: 3
              }
            ].map((item, idx) => (
              <div key={idx} className="relative bg-white p-10 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center hover:shadow-md transition-all group">
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">
                  {item.step}
                </div>
                <div className="p-6 bg-blue-50 rounded-full mb-8 group-hover:bg-blue-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Network Section */}
      <section className="px-4 py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Campus Lost & Found Network</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-16 text-lg">
            Our dedicated campus solution helps students and staff quickly recover lost items within educational institutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
            {images.map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-[2.5rem] shadow-xl aspect-square md:aspect-[4/3] group relative border-8 border-gray-50">
                <img 
                  src={img} 
                  alt={`Campus ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-8">
                  <span className="text-white font-bold tracking-wider">VIEW CAMPUS</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-16">Trusted by 50+ Campuses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { label: "Items Recovered", value: "500+" },
                { label: "Active Users", value: "1,200+" },
                { label: "Satisfaction Rate", value: "98%" }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-6xl font-extrabold text-gray-900 mb-3 tracking-tight">{stat.value}</div>
                  <div className="text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="px-4 py-24 bg-[#FCFBF8]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-display">Popular Categories</h2>
          <p className="text-gray-500 mb-16">Browse the most common types of items</p>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[
              { icon: <Smartphone />, label: "Phones" },
              { icon: <Wallet />, label: "Wallets" },
              { icon: <Key />, label: "Keys" },
              { icon: <IdCard />, label: "IDs" },
              { icon: <ShoppingBag />, label: "Bags" },
              { icon: <Gem />, label: "Jewelry" }
            ].map((cat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-200 transition-all cursor-pointer group flex flex-col items-center">
                <div className="text-[#8B7E74] mb-5 group-hover:text-emerald-500 transition-all transform group-hover:scale-110">
                  {React.cloneElement(cat.icon, { size: 36, strokeWidth: 1.5 })}
                </div>
                <div className="font-semibold text-gray-600 text-sm group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="px-4 py-24 bg-[#10B981] rounded-2xl">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Ready to find what's missing?</h2>
          <p className="text-emerald-50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">Join thousands of students and staff in creating a safer campus community.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-[#10B981] font-extrabold rounded-2xl hover:bg-emerald-50 transition-all shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1"
          >
            Get Started Now
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
