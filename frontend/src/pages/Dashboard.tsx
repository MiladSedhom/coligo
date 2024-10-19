import AnnouncementsList from "../components/Announcement/AnnouncementsList";
import ExamsTips from "../components/ExamsTips";
import NewQuizzes from "../components/Quiz/NewQuizzes";
import { useAxios } from "hookverse";
import { useEffect, useState } from "react";
import AnnouncementType from "../types/AnnouncementType";
import Box from "@mui/material/Box";
import QuizType from "../types/QuizType";

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[] | null>(
    null
  );

  const {
    data: announcementsData,
    runAxios: fetchAnnouncements,
    loading: announcementsLoading,
  } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/announcement`,
    searchParams: "limit=4",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  useEffect(() => {
    if (announcementsData) {
      setAnnouncements(announcementsData.announcements);
    }
  }, [announcementsData]);

  const [quizzes, setQuizzes] = useState<QuizType[] | null>(null);

  const {
    data: quizzesData,
    runAxios: fetchQuizzes,
    loading: quizzesLoading,
  } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/quiz`,
    searchParams: "limit=2",
  });

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    if (quizzesData) {
      setQuizzes(quizzesData.quizzes);
    }
  }, [quizzesData]);

  return (
    <>
      <ExamsTips />
      <Box
        sx={{
          marginTop: "1.5rem !important",
          display: "flex",
          flexDirection: { sm: "column", md: "row" },
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <AnnouncementsList
          loading={announcementsLoading}
          announcements={announcements!}
        />
        <NewQuizzes loading={quizzesLoading} quizzes={quizzes!} />
      </Box>
    </>
  );
};

export default Dashboard;
