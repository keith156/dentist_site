
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  Award, 
  HeartPulse, 
  Sparkles, 
  UserRound, 
  Baby, 
  Stethoscope, 
  Activity,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Loader2,
  CheckCircle2,
  Quote
} from 'lucide-react';
import { Service, Doctor, Testimonial, Feature } from './types';

const SERVICES: Service[] = [
  {
    id: '1',
    title: 'General Dentistry',
    description: 'Routine checkups, cleanings, and preventative care to keep your smile healthy and vibrant.',
    icon: <Stethoscope className="w-8 h-8 text-teal-600" />
  },
  {
    id: '2',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments that safely brighten your teeth by several shades.',
    icon: <Sparkles className="w-8 h-8 text-teal-600" />
  },
  {
    id: '3',
    title: 'Orthodontics',
    description: 'Modern alignment solutions including traditional braces and clear aligners for all ages.',
    icon: <Activity className="w-8 h-8 text-teal-600" />
  },
  {
    id: '4',
    title: 'Pediatric Dentistry',
    description: 'Specialized, gentle dental care designed to make visits fun and comfortable for children.',
    icon: <Baby className="w-8 h-8 text-teal-600" />
  },
  {
    id: '5',
    title: 'Dental Implants',
    description: 'Permanent, natural-looking solutions to replace missing teeth and restore your bite.',
    icon: <HeartPulse className="w-8 h-8 text-teal-600" />
  },
  {
    id: '6',
    title: 'Emergency Care',
    description: 'Same-day appointments for urgent dental issues including toothaches or accidents.',
    icon: <ShieldCheck className="w-8 h-8 text-teal-600" />
  }
];

const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. KK',
    specialty: 'Cosmetic Dentist',
    bio: 'With over 15 years of experience, Dr. KK specializes in complex smile makeovers and high-end restorative dentistry.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd2',
    name: 'Dr. Dan',
    specialty: 'Pediatric Dentist',
    bio: 'Dedicated to providing a positive dental experience for children through a gentle, compassionate approach.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd3',
    name: 'Dr. Job',
    specialty: 'Orthodontist',
    bio: 'Dr. Job is an expert in modern alignment techniques, utilizing the latest technology for perfect smiles.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Michael Chen',
    rating: 5,
    content: "The best dental experience I've ever had. Dr. KK and the staff are incredibly friendly and the clinic is spotless. My teeth have never looked better!",
    date: '2 months ago'
  },
  {
    id: 't2',
    author: 'Emily Johnson',
    rating: 5,
    content: "My kids actually look forward to their dental visits now. Dr. Dan is amazing with children. Highly recommend to all parents!",
    date: '1 month ago'
  },
  {
    id: 't3',
    author: 'Robert Davies',
    rating: 5,
    content: "Professional, efficient, and painless. Dr. Job took the time to explain my alignment plan clearly. I'm already seeing great results.",
    date: '3 weeks ago'
  }
];

const FEATURES: Feature[] = [
  {
    title: 'Modern Technology',
    description: 'We use the latest diagnostic and treatment equipment for precision care.',
    icon: <Sparkles className="w-6 h-6 text-teal-600" />
  },
  {
    title: 'Comfort First',
    description: 'Relaxing environment with amenities to ensure your visit is stress-free.',
    icon: <ShieldCheck className="w-6 h-6 text-teal-600" />
  },
  {
    title: 'Expert Team',
    description: 'Highly qualified specialists dedicated to your long-term oral health.',
    icon: <UserRound className="w-6 h-6 text-teal-600" />
  },
  {
    title: 'Flexible Hours',
    description: 'Early morning and late evening appointments to fit your busy schedule.',
    icon: <Clock className="w-6 h-6 text-teal-600" />
  }
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xvgzezlp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _to: 'keithjosh87@gmail.com',
          _subject: 'New Appointment Request from BrightSmile Website'
        })
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-teal-900' : 'text-slate-900'}`}>
                Bright<span className="text-teal-600">Smile</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {['Home', 'About', 'Services', 'Doctors', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className={`text-sm font-semibold transition-colors hover:text-teal-600 ${scrolled ? 'text-slate-600' : 'text-slate-800'}`}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-teal-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-teal-700 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Book Appointment
              </a>
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 rounded-md text-slate-800 focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-xl absolute top-full left-0 right-0 border-t border-slate-100">
            <div className="flex flex-col p-4 space-y-4">
              {['Home', 'About', 'Services', 'Doctors', 'Testimonials', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-slate-800 hover:text-teal-600 px-4 py-2 rounded-lg hover:bg-slate-50"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-teal-600 text-white text-center py-4 rounded-xl font-bold text-lg"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-teal-100 shadow-sm animate-fade-in">
                  <Award className="w-5 h-5 text-teal-600" />
                  <span className="text-teal-900 font-semibold text-sm">Voted #1 Dental Clinic in the Region</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                  Healthy Smiles <br />
                  <span className="text-teal-600">For Life.</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
                  Experience world-class dental care tailored to your needs. Our expert team uses cutting-edge technology to ensure your comfort and the best results.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-teal-600 text-white rounded-full font-bold text-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200 active:scale-95 flex items-center justify-center space-x-2">
                    <span>Book Appointment</span>
                    <ArrowRight size={20} />
                  </a>
                  <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-white text-teal-600 rounded-full font-bold text-lg border-2 border-teal-100 hover:border-teal-200 transition-all flex items-center justify-center space-x-2">
                    <span>Our Services</span>
                  </a>
                </div>
                <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-slate-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Patient" />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-sm font-medium">Over 2,500 Happy Patients</span>
                  </div>
                </div>
              </div>
              <div className="relative group hidden lg:block">
                <div className="absolute -inset-4 bg-gradient-to-tr from-teal-400 to-blue-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop" 
                  alt="Modern Dental Office Interior" 
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] lg:aspect-[4/5]"
                />
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-bounce-slow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Available</p>
                      <p className="text-lg font-bold text-slate-900">Today, 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Why Choose Us */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-2xl bg-slate-50 hover:bg-teal-600 transition-all duration-300 border border-slate-100">
                  <div className="mb-6 p-3 bg-white inline-block rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 group-hover:text-teal-50 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop" 
                  alt="Our Clinic Team" 
                  className="rounded-3xl shadow-2xl z-10 relative h-[600px] w-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-200/20 rounded-full blur-3xl -z-0"></div>
                <div className="absolute -bottom-10 -right-10 bg-teal-600 text-white p-10 rounded-3xl shadow-2xl text-center">
                  <p className="text-5xl font-black mb-1">15+</p>
                  <p className="text-teal-100 font-bold uppercase tracking-wider text-sm">Years of Care</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-bold uppercase tracking-wider">
                  Our Mission
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">
                  We care for your teeth <br />
                  as if they were our own.
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Founded in 2008, BrightSmile has been at the forefront of dental innovation in our community. We believe that a healthy smile is the foundation of confidence and overall well-being.
                </p>
                <div className="space-y-4">
                  {[
                    "Gentle & compassionate patient approach",
                    "Advanced digital imaging for precise diagnosis",
                    "A focus on preventative education",
                    "Modern, hygienic facility"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="bg-teal-100 p-1 rounded-full">
                        <ChevronRight size={18} className="text-teal-600" />
                      </div>
                      <span className="font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <a href="#doctors" className="inline-flex items-center space-x-2 text-teal-600 font-bold text-lg hover:underline underline-offset-4">
                    <span>Meet Our Specialists</span>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">Our Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                We provide a comprehensive range of dental services to ensure your family's oral health is maintained to the highest standards.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <div key={service.id} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-teal-50 flex items-center justify-center rounded-2xl mb-8 group-hover:bg-teal-600 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <a href="#contact" className="text-teal-600 font-bold inline-flex items-center group">
                    Book Service <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section id="doctors" className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,#0d9488_0%,transparent_50%)] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold">Meet the Experts</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Our team of dedicated professionals is here to provide you with the highest level of expertise and care.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {DOCTORS.map((doctor) => (
                <div key={doctor.id} className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300">
                    <p className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-1">{doctor.specialty}</p>
                    <h3 className="text-2xl font-bold mb-3">{doctor.name}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-24 overflow-hidden">
                      {doctor.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Slider */}
        <section id="testimonials" className="py-24 bg-teal-50/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900">What Patients Say</h2>
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />)}
                <span className="ml-2 font-bold text-slate-700">4.9 / 5.0 Rating</span>
              </div>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="relative overflow-hidden h-[400px] sm:h-[350px]">
                {TESTIMONIALS.map((t, index) => (
                  <div 
                    key={t.id} 
                    className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out p-6 sm:p-12 ${
                      index === activeTestimonial 
                        ? 'opacity-100 translate-x-0 pointer-events-auto' 
                        : index < activeTestimonial 
                          ? 'opacity-0 -translate-x-full pointer-events-none' 
                          : 'opacity-0 translate-x-full pointer-events-none'
                    }`}
                  >
                    <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-teal-900/5 relative w-full border border-teal-100">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-teal-600 p-4 rounded-2xl text-white shadow-lg">
                        <Quote size={28} />
                      </div>
                      
                      <div className="flex items-center justify-center space-x-1 mb-8 pt-4">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="fill-yellow-400 text-yellow-400" size={18} />
                        ))}
                      </div>

                      <p className="text-slate-700 italic leading-relaxed mb-10 text-lg sm:text-xl text-center max-w-2xl mx-auto">
                        "{t.content}"
                      </p>

                      <div className="flex flex-col items-center border-t border-slate-100 pt-8">
                        <span className="font-black text-slate-900 text-lg">{t.author}</span>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{t.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16 bg-white p-4 rounded-full shadow-xl text-teal-600 hover:bg-teal-600 hover:text-white transition-all z-20 hidden sm:block border border-teal-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16 bg-white p-4 rounded-full shadow-xl text-teal-600 hover:bg-teal-600 hover:text-white transition-all z-20 hidden sm:block border border-teal-50"
              >
                <ChevronRight size={24} />
              </button>

              <div className="flex justify-center space-x-3 mt-8">
                {TESTIMONIALS.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-12 bg-teal-600' : 'w-2 bg-slate-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-teal-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500 -skew-x-12 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-6xl font-extrabold">Ready to smile again?</h2>
                  <p className="text-teal-50 text-xl max-w-lg">
                    Contact us today to schedule your consultation or routine checkup. We look forward to seeing you.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur p-4 rounded-2xl w-fit">
                    <div className="bg-white p-3 rounded-xl">
                      <Phone className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-teal-100 uppercase tracking-wider">Call Us Today</p>
                      <p className="text-xl font-bold">+1 (555) 000-0000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur p-4 rounded-2xl w-fit">
                    <div className="bg-white p-3 rounded-xl">
                      <Mail className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-teal-100 uppercase tracking-wider">Email Us</p>
                      <p className="text-xl font-bold">hello@brightsmile.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur p-4 rounded-2xl w-fit">
                    <div className="bg-white p-3 rounded-xl">
                      <MapPin className="text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-teal-100 uppercase tracking-wider">Visit Us</p>
                      <p className="text-xl font-bold">123 Health Ave, Suite 100, Cityville</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl transition-all duration-500">
                {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-6 animate-fade-in">
                    <div className="bg-teal-100 p-4 rounded-full">
                      <CheckCircle2 className="w-16 h-16 text-teal-600" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-900">Message Sent!</h3>
                    <p className="text-slate-600 max-w-xs mx-auto">
                      Thank you for contacting BrightSmile. We've received your request and will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="text-teal-600 font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-slate-700 font-bold text-sm">Full Name</label>
                        <input 
                          name="name"
                          required
                          type="text" 
                          placeholder="John Doe" 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-slate-700 font-bold text-sm">Phone Number</label>
                        <input 
                          name="phone"
                          required
                          type="tel" 
                          placeholder="(555) 000-0000" 
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-700 font-bold text-sm">Email Address</label>
                      <input 
                        name="email"
                        required
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-700 font-bold text-sm">Service Interested In</label>
                      <select 
                        name="service"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option>General Checkup</option>
                        <option>Teeth Whitening</option>
                        <option>Orthodontics</option>
                        <option>Pediatric Care</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-700 font-bold text-sm">Message</label>
                      <textarea 
                        name="message"
                        required
                        rows={4} 
                        placeholder="How can we help you?" 
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      ></textarea>
                    </div>
                    
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm font-semibold">Something went wrong. Please try again or call us directly.</p>
                    )}

                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg active:scale-95 disabled:opacity-70 flex items-center justify-center space-x-2"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="bg-teal-600 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-slate-900">Bright<span className="text-teal-600">Smile</span></span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Expert dental care for the whole family. We combine a gentle approach with the latest technology for beautiful, lasting results.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg text-teal-600 hover:bg-teal-600 hover:text-white transition-all shadow-sm">
                  <Facebook size={20} />
                </a>
                <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg text-teal-600 hover:bg-teal-600 hover:text-white transition-all shadow-sm">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-2 bg-white border border-slate-200 rounded-lg text-teal-600 hover:bg-teal-600 hover:text-white transition-all shadow-sm">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">Quick Links</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#about" className="hover:text-teal-600 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-teal-600 transition-colors">Our Services</a></li>
                <li><a href="#doctors" className="hover:text-teal-600 transition-colors">Our Doctors</a></li>
                <li><a href="#contact" className="hover:text-teal-600 transition-colors">Book Now</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">Services</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#" className="hover:text-teal-600 transition-colors">Whitening</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Implants</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Orthodontics</a></li>
                <li><a href="#" className="hover:text-teal-600 transition-colors">Emergency</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-bold text-slate-900">Opening Hours</h4>
              <ul className="space-y-4 text-slate-600">
                <li className="flex justify-between"><span>Mon - Fri:</span> <span className="font-semibold">8:00 AM - 7:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday:</span> <span className="font-semibold">9:00 AM - 3:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday:</span> <span className="text-teal-600 font-bold">Closed</span></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-teal-600 font-bold">
                  <Phone size={18} />
                  <span>Available for Emergencies</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-slate-500 font-medium">
            <p>&copy; {new Date().getFullYear()} BrightSmile Dental Clinic. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
