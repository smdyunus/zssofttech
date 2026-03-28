import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Internships',
  description:
    'Real Time Project Internship Programs at ZS Soft Tech with weekly tasks, real submissions, and verified certificates.',
};

export default function InternshipsPage() {
  const heroImage = 'https://zssofttech-internships.netlify.app/assets/hero-home.jpg';
  const audienceImage = 'https://zssofttech-internships.netlify.app/assets/audience.jpg';
  const highlights = ['Real projects', 'Weekly tasks', 'Real submissions', 'Verified certificates'];
  const courses = [
    {
      title: 'Java Development',
      description: 'Core Java concepts, OOP, JDBC and practical project-based learning.',
    },
    {
      title: 'Python Development',
      description: 'Python programming, automation scripts and hands-on projects.',
    },
    {
      title: 'Web Development',
      description: 'HTML, CSS, JavaScript and modern website building experience.',
    },
    {
      title: 'Projects Development using AI',
      description: 'Build practical projects using AI tools, prompts, workflows, and automation.',
    },
    {
      title: 'Data Analytics',
      description: 'Learn analytics tools, reporting, dashboards, and data-driven project workflows.',
    },
    {
      title: 'Software Testing',
      description: 'Manual testing, automation basics, and live testing projects.',
    },
  ];
  const designedFor = [
    'Students looking for practical exposure',
    'Freshers building job-ready experience',
    'Career-gap candidates restarting with real work',
  ];
  const certificatePoints = [
    'Internship domain & duration',
    'Real Time project title',
    'Unique Certificate ID',
    'Online verification',
  ];

  return (
    <section className="py-20 lg:py-28 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to ZS Soft Tech — where learning meets real work.
          </h1>
          <p className="text-lg text-muted">Real projects. Real tasks. Real experience.</p>
          <p className="text-base text-muted mt-3">
            ZS Soft Tech offers structured internships where students work on Real Time projects and build verifiable experience.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/40 mb-12">
          <div className="relative w-full h-56 sm:h-72 lg:h-80">
            <Image
              src={heroImage}
              alt="Students collaborating around a laptop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-foreground text-base sm:text-lg">
            {highlights.map((item) => `✔ ${item}`).join('  ')}
          </p>
        </div>

        <div className="text-center mb-10">
          <p className="text-foreground font-semibold">Online internships available • Offline support at Nandyal</p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Top Courses</h2>
          <p className="text-center text-muted max-w-3xl mx-auto mb-8">
            Explore our most in-demand internship and training programs designed for practical learning and real project experience.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <div key={course.title} className="rounded-2xl border border-border/40 bg-card/40 p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">{course.title}</h3>
                <p className="text-sm text-muted">{course.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border/40 bg-card/40 p-8">
            <h2 className="text-2xl font-bold mb-4">Designed For</h2>
            <div className="space-y-3">
              {designedFor.map((item) => (
                <div key={item} className="flex items-start gap-2 text-muted">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="relative w-full h-52 rounded-xl overflow-hidden border border-border/40 mt-6">
              <Image
                src={audienceImage}
                alt="Team collaboration in a training session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card/40 p-8">
            <h2 className="text-2xl font-bold mb-4">Verified Internship Certificate</h2>
            <p className="text-muted mb-4">
              Certificates are issued only after successful task completion and include:
            </p>
            <div className="space-y-3">
              {certificatePoints.map((item) => (
                <div key={item} className="flex items-start gap-2 text-muted">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-muted mt-4">
              Recruiters can verify certificates directly on the ZS Soft Tech website.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-card/40 p-8 mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Start with the Right Internship</h2>
          <p className="text-muted">
            Explore internship programs, understand how they work, and choose the domain that fits your career goals.
          </p>
        </div>
      </div>
    </section>
  );
}
