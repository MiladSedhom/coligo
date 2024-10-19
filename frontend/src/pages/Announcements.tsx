import Stack from "@mui/material/Stack";
import AnnouncementForm from "../components/Announcement/AnnouncementForm";
import AnnouncementsList from "../components/Announcement/AnnouncementsList";
import { useAxios } from "hookverse";
import { useCallback, useEffect, useState } from "react";
import AnnouncementType from "../types/AnnouncementType";

const Announcements = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementType | null>(null);

  const [announcements, setAnnouncements] = useState<AnnouncementType[] | []>(
    []
  );

  const { data, runAxios, loading } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/announcement`,
  });

  useEffect(() => {
    runAxios();
  }, [runAxios]);

  useEffect(() => {
    if (data) setAnnouncements(data.announcements);
  }, [data]);

  const addAnnouncement = useCallback((newAnnouncement: AnnouncementType) => {
    setAnnouncements((prevAnnouncements) => [
      newAnnouncement,
      ...prevAnnouncements,
    ]);
  }, []);

  const deleteAnnouncement = useCallback((_id: AnnouncementType["_id"]) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement._id !== _id)
    );
  }, []);

  const updateAnnouncement = useCallback(
    (_id: AnnouncementType["_id"], newText: AnnouncementType["text"]) => {
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.map((announcement) =>
          announcement._id === _id
            ? { ...announcement, text: newText }
            : announcement
        )
      );
    },
    []
  );

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
      <AnnouncementsList
        loading={loading}
        announcements={announcements}
        deleteAnnouncement={deleteAnnouncement}
        setSelectedAnnouncement={setSelectedAnnouncement}
        displayActions={true}
      />
      <AnnouncementForm
        selectedAnnouncement={selectedAnnouncement}
        setSelectedAnnouncement={setSelectedAnnouncement}
        addAnnouncement={addAnnouncement}
        updateAnnouncement={updateAnnouncement}
      />
    </Stack>
  );
};

export default Announcements;
