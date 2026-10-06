export interface PlacedStudent {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  course: string;
}

/** Students who got placed — shown on the home page success section. */
export const placedStudents: PlacedStudent[] = [
  {
    id: 1,
    name: "Shaik Ayub",
    role: "QA Engineer",
    company: "Obopay Mobile Technology Pvt Ltd",
    image: "/images/testimonials/Ayub.jpg",
    course: "Automation Testing",
  },
  {
    id: 2,
    name: "Amir Hamza",
    role: "Java Full Stack Developer",
    company: "Accenture",
    image: "/images/testimonials/Hamza.jpg",
    course: "Java Full Stack Development",
  },
  {
    id: 3,
    name: "Shaik Mohammad Sharif",
    role: "QA Engineer",
    company: "Capgemini",
    image: "/images/testimonials/Sharif.jpg",
    course: "Automation Testing",
  },
  {
    id: 4,
    name: "Syed Javeed Hussain",
    role: "QA Engineer",
    company: "Eximietas.design",
    image: "/images/testimonials/Javeed.jpg",
    course: "Automation Testing",
  },
  {
    id: 5,
    name: "Shaik Fayaz",
    role: "Java Full Stack Developer",
    company: "Concentrix",
    image: "/images/testimonials/Fayaz.jpg",
    course: "Java Full Stack Development",
  },
];
