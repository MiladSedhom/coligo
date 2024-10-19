import { IoHome } from "react-icons/io5";
import {
  FaCalendarDays,
  FaBook,
  FaGraduationCap,
  FaBullhorn,
  FaHourglassHalf,
} from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";

const sidebarLinks = [
  {
    id: 1,
    text: "dashboard",
    path: "/dashboard",
    icon: <IoHome className="icon" />,
  },
  {
    id: 2,
    text: "schedule",
    path: "/schedule",
    icon: <FaCalendarDays className="icon" />,
  },
  {
    id: 3,
    text: "courses",
    path: "/courses",
    icon: <FaBook className="icon" />,
  },
  {
    id: 4,
    text: "gradebook",
    path: "/gradebook",
    icon: <FaGraduationCap className="icon" />,
  },
  {
    id: 5,
    text: "performance",
    path: "/performance",
    icon: <BsGraphUpArrow className="icon" />,
  },
  {
    id: 6,
    text: "announcements",
    path: "/announcements",
    icon: <FaBullhorn className="icon" />,
  },
  {
    id: 7,
    text: "quizzes",
    path: "/quizzes",
    icon: <FaHourglassHalf className="icon" />,
  },
];

export default sidebarLinks;
