import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import Login from './Auth/login';
import SignUp from './Auth/signup';
import ProfileInfoCard from '../components/cards/ProfileInfoCard';
import { UserContext } from '../context/usercontext';

const LandingPage = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    stats: false,
    features: false,
    steps: false,
    benefits: false
  });

  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const benefitsRef = useRef(null);

  const templateNames = [
    "Classic Sidebar", "Minimalist Header", "Bold Banner", "Elegant Split",
    "Centered Classic", "Light Sidebar", "Top Banner Pro", "Vertical Accent",
    "Dark Sidebar", "Icon Badges", "Square Profile", "Full Header",
    "Pill Headers", "Card Style"
  ];

  useEffect(() => {
    if (!loading && !user) {
      setOpenAuthModal(true);
    } else {
      setOpenAuthModal(false);
    }
  }, [user, loading]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTemplateIndex((prev) => (prev + 1) % templateNames.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.dataset.section;
          setVisibleSections(prev => ({ ...prev, [sectionName]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [statsRef, featuresRef, stepsRef, benefitsRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const magneticButtons = document.querySelectorAll('.magnetic-hover');
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });

    const rippleButtons = document.querySelectorAll('.ripple-effect');
    rippleButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        const ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);
        setTimeout(() => {
          ripples.remove();
        }, 1000);
      });
    });
  }, []);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const features = [
    { icon: "🎨", title: "Professional Templates", description: "Choose from 14 ATS-friendly templates designed by experts" },
    { icon: "⚡", title: "Lightning Fast", description: "Create your resume in minutes with our intuitive interface" },
    { icon: "📱", title: "Responsive Design", description: "Your resume looks perfect on any device - desktop, tablet, or mobile" },
    { icon: "☁️", title: "Auto-Save", description: "Never lose your progress with automatic cloud saving" },
    { icon: "📄", title: "Multiple Formats", description: "Download your resume in PDF format" },
    { icon: "🔒", title: "Secure & Private", description: "Your data is encrypted and stored securely with enterprise-grade security" }
  ];

  const steps = [
    { number: "01", title: "Sign Up", description: "Create your free account in seconds" },
    { number: "02", title: "Choose Template", description: "Select from our 14 professional resume templates" },
    { number: "03", title: "Fill Details", description: "Add your information with our easy-to-use form" },
    { number: "04", title: "Download", description: "Export your resume and start applying" }
  ];

  const stats = [
    { number: "10K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "14", label: "Templates" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className='w-full min-h-full bg-white'>
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center">
          <div className="text-4xl font-extrabold tracking-wide" style={{ fontFamily: 'Urbanist, sans-serif', color: '#2563eb', textShadow: '0 2px 4px rgba(37, 99, 235, 0.1)' }}>
            Resume Builder
          </div>
          {user ? <ProfileInfoCard /> : (
            <button className="btn-53" onClick={() => setOpenAuthModal(true)}>
              <span className="original">Login</span>
              <span className="letters"><span>L</span><span>o</span><span>g</span><span>i</span><span>n</span></span>
            </button>
          )}
        </header>

        <div className="flex flex-col md:flex-row items-center justify-between mt-16 gap-12">
          <div className={`w-full md:w-1/2 md:pr-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-7xl font-extrabold mb-8 leading-tight" style={{ fontFamily: 'Urbanist, sans-serif', color: '#2563eb' }}>
              <span className="inline-block animate-letter-fade" style={{ animationDelay: '0.1s' }}>Build</span>{" "}
              <span className="inline-block animate-letter-fade" style={{ animationDelay: '0.2s' }}>Your</span>{" "}
              <span className="bg-gradient-to-r from-orange-400 via-blue-500 to-blue-700 bg-clip-text text-transparent animate-text-shine inline-block animate-letter-fade" style={{ animationDelay: '0.3s' }}>
                Resume in Minutes
              </span>
            </h1>
            <p className="text-2xl text-gray-700 mb-10 leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
              Craft a standout resume with our fast and smart resume builder. Join thousands of professionals who landed their dream jobs.
            </p>
            <button className="cssbuttons-io-button magnetic-hover ripple-effect animate-scale-in" style={{ animationDelay: '0.7s' }} onClick={handleCTA}>
              Get Started
              <span className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M12 4v16m8-8H4" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>

          <div className={`w-full md:w-1/2 flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>

              <div className="relative bg-white rounded-2xl shadow-2xl p-8" style={{ height: '600px' }}>
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Template {currentTemplateIndex + 1} of 14
                </div>

                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center transition-all duration-700" key={currentTemplateIndex}>
                    <div className="text-8xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {String(currentTemplateIndex + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">{templateNames[currentTemplateIndex]}</h3>
                    <p className="text-lg text-gray-600">Professional Resume Design</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {templateNames.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTemplateIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTemplateIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-float hover-glow">
                14 Templates
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-pulse-glow">
                ATS Friendly
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={statsRef} data-section="stats" className={`bg-gradient-to-r from-blue-600 to-blue-800 py-16 mt-24 transition-all duration-1000 ${visibleSections.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center hover-scale transition-all duration-700 ${visibleSections.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="text-5xl font-extrabold text-white mb-2 transition-transform duration-300 animate-count-up" style={{ fontFamily: 'Urbanist, sans-serif', animationDelay: `${0.5 + (index * 0.2)}s` }}>{stat.number}</div>
                <div className="text-blue-100 text-lg font-medium animate-letter-fade" style={{ animationDelay: `${0.8 + (index * 0.2)}s` }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={featuresRef} data-section="features" className="container mx-auto px-4 py-24">
        <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-extrabold mb-4" style={{ fontFamily: 'Urbanist, sans-serif', color: '#2563eb' }}>Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to create a professional resume that stands out</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card glass-card glass-card-hover p-8 rounded-2xl transition-all duration-500 hover:-translate-y-3 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
              <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 transition-colors duration-300 hover:text-blue-600" style={{ fontFamily: 'Urbanist, sans-serif' }}>{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={stepsRef} data-section="steps" className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.steps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-extrabold mb-4" style={{ fontFamily: 'Urbanist, sans-serif', color: '#2563eb' }}>How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Create your professional resume in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className={`relative transition-all duration-700 ${visibleSections.steps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-400 text-center hover:-translate-y-3 hover-lift group">
                  <div className="text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110" style={{ fontFamily: 'Urbanist, sans-serif' }}>{step.number}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 transition-colors duration-300 group-hover:text-blue-600" style={{ fontFamily: 'Urbanist, sans-serif' }}>{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={benefitsRef} data-section="benefits" className="container mx-auto px-4 py-24">
        <div className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 ${visibleSections.benefits ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-extrabold mb-6" style={{ fontFamily: 'Urbanist, sans-serif', color: '#2563eb' }}>Why Choose Our Resume Builder?</h2>
            <div className="space-y-6">
              {['ATS-Optimized', 'Expert-Designed', 'Always Updated'].map((title, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover-scale cursor-pointer group glass-card stagger-${i + 1}`}>
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110">
                    <svg className="w-6 h-6 text-blue-600 transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-blue-600">{title}</h3>
                    <p className="text-gray-600">{i === 0 ? 'Our templates are designed to pass Applicant Tracking Systems' : i === 1 ? 'Created by HR professionals and career coaches' : 'Regular updates with latest industry trends and best practices'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${visibleSections.benefits ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 rounded-3xl shadow-2xl text-white hover-lift">
              <h3 className="text-3xl font-bold mb-6 animate-slide-in-up" style={{ fontFamily: 'Urbanist, sans-serif' }}>Ready to Get Started?</h3>
              <p className="text-xl mb-8 text-blue-50">Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.</p>
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-2xl hover:scale-110 active:scale-95" onClick={handleCTA}>
                Create Your Resume Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© 2024 Resume Builder. All rights reserved. | Built with ❤️ for job seekers</p>
        </div>
      </div>

      <Modal isOpen={openAuthModal} onClose={() => { setOpenAuthModal(false); setCurrentPage("login"); }} hideHeader>
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  )
}

export default LandingPage