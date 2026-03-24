'use client';

import { ArrowUpRight, GraduationCap, Briefcase, Code2, Sparkles, Building2, MessageCircle, Mail, Linkedin, CalendarOff } from "lucide-react";

export default function Projects() {
  const experiences = [
    {
      company: "Cloud Infosystem",
      domain: "cloudinfosystem.com",
      role: "Operations & Process Excellence Manager",
      duration: "Dec 2023 - Present",
      description: "Led 30-member cross-functional team across finance ops and compliance. Reduced operational discrepancies by 25%."
    },
    {
      company: "Choice International",
      domain: "choiceindia.com",
      role: "Senior Exec – Stock Broking Ops",
      duration: "Jul 2022 - Dec 2023",
      description: "Coordinated operations across 2 branches. Streamlined client workflows, reducing turnaround time by 20%. Spearheaded Rajasthan-wide Demat Account Opening via eMitras."
    },
    {
      company: "ICICI Bank",
      domain: "icicibank.com",
      role: "Relationship Manager – Branch Banking",
      duration: "Apr 2021 - Jul 2022",
      description: "Led 10-member operations team. Drove CASA portfolio growth and handled end-to-end loan lifecycles from application to post-sanction compliance."
    },
    {
      company: "Muthoot Finance",
      domain: "muthootfinance.com",
      role: "Junior Relationship Exec – Loan Ops",
      duration: "Aug 2018 - Apr 2021",
      description: "Supported branch loan operations with a 5-member team. Maintained zero-discrepancy records through strict documentation control."
    }
  ];

  const competencies = [
    "Process Excellence & Optimization", "Finance Operations Management", 
    "Training & Knowledge Enablement", "SOP Development & Documentation", 
    "Compliance & Audit Readiness", "Cross-Functional Coordination", 
    "Workflow Automation", "Stakeholder Management", 
    "Revenue Reconciliation", "Quality Assurance", 
    "Project Management", "Performance Tracking"
  ];

  const technicalSkills = {
    tools: ["Microsoft Excel (Advanced Formulas, Pivot)", "PowerPoint", "CRM Systems", "Billing & Invoicing Systems", "Financial Software", "Process Mapping Tools"],
    domains: ["BFSI Operations", "Stock Broking (SEBI Compliance)", "Banking Operations", "Finance & Accounting", "Internal Controls"],
    languages: ["English (Fluent)", "Hindi (Native)"]
  };

  const education = [
    {
      degree: "MBA – Accounting & Finance",
      institution: "Rajasthan Technical University / MITRC, Alwar",
      duration: "May 2016 – July 2018",
      coursework: ["Financial Management", "Operations Management", "Business Analytics", "Strategic Planning"]
    },
    {
      degree: "BBA – Business Administration & Management",
      institution: "Institute of Engineering and Technology",
      duration: "April 2013 – March 2016",
      coursework: ["Business Operations", "Financial Accounting", "Marketing Management", "Organizational Behavior"]
    }
  ];

  const additionalInfo = {
    attributes: [
      "Analytical & Problem-Solving", "Effective Communication", 
      "Detail-Oriented", "Data-Driven Decision Making", 
      "Cross-Functional Collaboration", "Process Improvement Mindset", 
      "Audit & Compliance Focused", "Results-Oriented"
    ],
    interests: ["Process Automation", "Operational Efficiency", "Data Analytics", "Continuous Improvement Methodologies"]
  };

  return (
    <section className="min-h-screen bg-[#121212] pt-32 pb-24 px-8 lg:px-24 text-white z-20 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* === EXPERIENCE SECTION === */}
        <div className="flex items-center gap-4 mb-16 text-white/50">
          <Briefcase className="w-5 h-5" />
          <h3 className="text-sm uppercase tracking-[0.3em]">Professional Experience</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-32">
          {experiences.map((exp, i) => (
            <div 
              key={i}
              className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8 md:p-12 hover:bg-white/[0.05] transition-all duration-700 overflow-hidden cursor-pointer flex flex-col justify-between min-h-[400px]"
            >
              {/* === CLEAN CORNER LOGO WATERMARK === */}
              <div className="absolute -bottom-10 -right-10 w-72 h-72 z-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.15] transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-3 flex items-center justify-center overflow-hidden">
                <span className="text-[18rem] font-black text-white leading-none select-none">
                  {exp.company.charAt(0)}
                </span>
              </div>
              
              <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex justify-between items-start mb-16 md:mb-24">
                <span className="text-sm font-mono text-white/40">{exp.duration}</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 bg-black/20 backdrop-blur-md">
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
              </div>
              
              <div className="relative z-10 mt-auto">
                <span className="text-sm text-white/50 mb-2 block tracking-wide">{exp.company}</span>
                <h4 className="text-2xl md:text-3xl font-medium tracking-tight text-white/90 group-hover:text-white transition-colors mb-4">
                  {exp.role}
                </h4>
                <p className="text-white/60 font-light leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-white/5 mb-24" />

        {/* === SKILLS & COMPETENCIES SECTION === */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
          {/* Core Competencies */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10 text-white/50">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm uppercase tracking-[0.3em]">Core Competencies</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {competencies.map((comp, idx) => (
                <span key={idx} className="px-4 py-2 border border-white/10 rounded-full text-sm text-white/70 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-default">
                  {comp}
                </span>
              ))}
            </div>
          </div>
          
          {/* Technical Skills */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10 text-white/50">
              <Code2 className="w-5 h-5" />
              <h3 className="text-sm uppercase tracking-[0.3em]">Technical Arsenal</h3>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-white/80 mb-3 font-medium">Tools & Systems</h4>
                <p className="text-white/50 font-light leading-relaxed">{technicalSkills.tools.join(" • ")}</p>
              </div>
              <div>
                <h4 className="text-white/80 mb-3 font-medium">Domain Knowledge</h4>
                <p className="text-white/50 font-light leading-relaxed">{technicalSkills.domains.join(" • ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* === EDUCATION & ADDITIONAL INFO SECTION === */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
          {/* Education */}
          <div className="flex-1 border-l border-white/10 pl-8 lg:pl-12">
            <div className="flex items-center gap-4 mb-10 text-white/50 -ml-[54px] lg:-ml-[70px] bg-[#121212] w-max pr-4">
              <GraduationCap className="w-5 h-5" />
              <h3 className="text-sm uppercase tracking-[0.3em]">Education Hub</h3>
            </div>
            
            <div className="space-y-12">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-10 lg:-left-14 top-2 w-3 h-3 rounded-full bg-white/20 border-2 border-[#121212]" />
                  <span className="text-sm font-mono text-white/40 mb-2 block">{edu.duration}</span>
                  <h4 className="text-xl md:text-2xl text-white/90 mb-1">{edu.degree}</h4>
                  <p className="text-white/50 mb-3 font-light"><Building2 className="inline-block w-4 h-4 mr-2 -mt-1"/>{edu.institution}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {edu.coursework.map((course, cIdx) => (
                      <span key={cIdx} className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10 text-white/50">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm uppercase tracking-[0.3em]">Additional Insights</h3>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="text-white/80 mb-3 font-medium">Professional Attributes</h4>
                <p className="text-white/50 font-light leading-relaxed">{additionalInfo.attributes.join(" • ")}</p>
              </div>
              <div>
                <h4 className="text-white/80 mb-3 font-medium">Interests & Focus</h4>
                <p className="text-white/50 font-light leading-relaxed">{additionalInfo.interests.join(" • ")}</p>
              </div>
              <div className="pt-4">
                <h4 className="text-white/80 mb-3 font-medium">Languages</h4>
                <p className="text-white/50 font-light leading-relaxed">{technicalSkills.languages.join(" • ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* === CONTACT / CONVERSION SECTION === */}
        <div className="mt-32 border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl -mr-48 -mt-48" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                Ready to optimize your operations?
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed mb-10">
                With a proven track record in process excellence and BFSI operations, I'm ready to bring scalable efficiency to your next project.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:autkarsh29@gmail.com" 
                  className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all flex items-center gap-3 active:scale-95"
                >
                  <Mail className="w-5 h-5" />
                  Book a Consultation
                </a>
                <a 
                  href="https://linkedin.com/in/utkarshagarwal-311802129" 
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all flex items-center gap-3 active:scale-95"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-white tracking-[0.4em] uppercase mb-4 text-xs font-medium opacity-40">Direct Contact</p>
              <p className="text-2xl font-light text-white/80 mb-2">+91-9571718523</p>
              <p className="text-xl font-light text-white/50 mb-8">Jaipur, Rajasthan, India</p>
              
              <div className="flex justify-start md:justify-end gap-6 text-white/30">
                <span className="text-xs uppercase tracking-widest hover:text-white transition-colors cursor-default">SOP Excellence</span>
                <span className="text-xs uppercase tracking-widest hover:text-white transition-colors cursor-default">BFSI Specialist</span>
                <span className="text-xs uppercase tracking-widest hover:text-white transition-colors cursor-default">Process Ninja</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp CTA */}
        <a 
          href="https://wa.me/919571718523" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-8 right-8 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center group"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-semibold whitespace-nowrap">
            WhatsApp Me
          </span>
        </a>

        <div className="mt-24 text-center text-white/20 text-xs tracking-[0.5em] uppercase pb-12">
          © {new Date().getFullYear()} Utkarsh Agarwal. Engineered for Excellence.
        </div>
      </div>
    </section>
  );
}
