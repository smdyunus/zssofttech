export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  joinedCompany: string;
  image: string;
  content: string;
  rating: number;
  course: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Shaik Ayub",
    role: "QA Engineer",
    company: "Obopay Mobile Technology Pvt Ltd",
    joinedCompany: "Obopay Mobile Technology Pvt Ltd",
    image: "/images/testimonials/Ayub.jpg",
    content:
      "ZS Soft Tech transformed my career. The Automation Testing course was incredibly hands-on, and the faculty ensured we built real projects. Within 3 months of completing the course, I landed a role at Obopay Mobile Technology Pvt Ltd. The best training institute in Nandyal!",
    rating: 5,
    course: "Course: Automation Testing",
  },
  {
    id: 2,
    name: "Amir Hamza",
    role: "Java Full Stack Developer",
    company: "Accenture",
    joinedCompany: "Accenture",
    image: "/images/testimonials/Hamza.jpg",
    content:
      "The Java Full Stack Development course gave me exactly the skills the industry demands. The practical approach with real projects and business case studies made learning intuitive. Highly recommend for anyone in Nandyal looking to break into Java Full Stack Development.",
    rating: 5,
    course: "Course: Java Full Stack Development",
  },
  {
    id: 3,
    name: "Shaik Mohammad Sharif",
    role: "QA Engineer",
    company: "Capgemini",
    joinedCompany: "Capgemini",
    image: "/images/testimonials/Sharif.jpg",
    content:
      "The Automation Testing course was incredibly hands-on, and the faculty ensured we built real projects. Within 3 months of completing the course, I landed a role at Capgemini. The best training institute in Nandyal!",
    rating: 5,
    course: "Course: Automation Testing",
  },
  {
    id: 4,
    name: "Syed Javeed Hussain",
    role: "QA Engineer",
    company: "Eximietas.design",
    joinedCompany: "Eximietas.design",
    image: "/images/testimonials/Javeed.jpg",
    content:
      "The Automation Testing course was incredibly hands-on, and the faculty ensured we built real projects. Within 3 months of completing the course, I landed a role at Eximietas.design. The best training institute in Nandyal!",
    rating: 5,
    course: "Course: Automation Testing",
  },
  {
    id: 5,
    name: "Shaik Fayaz",
    role: "Java Full Stack Developer",
    company: "Concentrix",  
    joinedCompany: "Concentrix",
    image: "/images/testimonials/Fayaz.jpg",
    content:
      "The Java Full Stack Development course was incredibly hands-on, and the faculty ensured we built real projects. Within 5 months of completing the course, I landed a role at Concentrix. The best training institute in Nandyal!",
    rating: 5,
    course: "Java Full Stack Development",
  }
];
