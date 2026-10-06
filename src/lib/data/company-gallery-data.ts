export type GalleryOrientation = "landscape" | "portrait";

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
  orientation: GalleryOrientation;
}

/** Life at ZS Soft Tech — internship photo gallery (14 items). */
export const companyGalleryItems: GalleryItem[] = [
  {
    src: "/images/realex-gallery/alumni-group.jpeg",
    alt: "Large team and alumni group at training center",
    caption: "Training Batches & Alumni Gatherings",
    subtitle: "Long-Term Internship Program | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/realex-gallery/team-celebration.png",
    alt: "Team celebration with Indian flags at the office",
    caption: "Team Celebrations & Culture",
    subtitle: "Collaborative Learning Environment | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/realex-gallery/team-meeting.png",
    alt: "Team meeting around a conference table",
    caption: "Collaborative Team Meetings",
    subtitle: "Industry-Oriented Offline Internship | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/python-training.jpeg",
    alt: "Internship session covering Python and full stack development",
    caption: "Python & Full Stack Training",
    subtitle: "Career-Focused Internship Program | Job-Ready Skills",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/data-visualization.jpeg",
    alt: "Internship batch celebrating training completion with certificates",
    caption: "Training Completion & Certification",
    subtitle: "Industry-Level Training | Hands-On Projects",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/male-batch-session.png",
    alt: "Male internship batch in a technical training session",
    caption: "Technical Training for Interns",
    subtitle: "Offline Long-Term Internship | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/mixed-batch-orientation.png",
    alt: "Internship batch orientation with mentors around a conference table",
    caption: "Internship Batch Orientation",
    subtitle: "Collaborative Learning | Industry-Oriented Training | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/internship-training-session.png",
    alt: "Interns in a hands-on training session",
    caption: "Hands-On Internship Training",
    subtitle: "Career-Focused Program | Job-Ready Skills Development | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/live-seminar-session.png",
    alt: "Live seminar session with instructor presenting to internship batch",
    caption: "Live Seminar & Training Sessions",
    subtitle: "Industry-Level Training | Your Journey to Success | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/classroom-training-session.jpeg",
    alt: "Large internship batch in a classroom training session",
    caption: "Classroom Training Programs",
    subtitle: "Real-Time Training for a Real-World Future | Nandyal",
    orientation: "landscape",
  },
  {
    src: "/images/internships-gallery/coding-workshop.png",
    alt: "Internship coding workshop with Python concepts projected on screen",
    caption: "Python Coding Workshop Sessions",
    subtitle: "Industry-Oriented Training | Nandyal",
    orientation: "portrait",
  },
  {
    src: "/images/internships-gallery/chart-analysis-session.png",
    alt: "Internship session with matplotlib data visualization projected on the wall",
    caption: "Data Visualization with Python",
    subtitle: "Matplotlib & Analytics Training | Hands-On Projects",
    orientation: "portrait",
  },
  {
    src: "/images/internships-gallery/group-orientation.png",
    alt: "Internship group orientation around a conference table",
    caption: "Internship Orientation Sessions",
    subtitle: "Career-Focused Program | Job-Ready Skills Development",
    orientation: "portrait",
  },
  {
    src: "/images/internships-gallery/career-orientation-session.png",
    alt: "Career orientation session with QR code presentation for interns",
    caption: "Career Orientation Sessions",
    subtitle: "Your Journey to Success Begins Here | Nandyal",
    orientation: "portrait",
  },
];
