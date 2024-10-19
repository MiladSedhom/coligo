import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AnnouncementsTimeline from "./AnnouncementsTimeline";
import AnnouncementType from "../../types/AnnouncementType";
import { useTranslation } from "react-i18next";

type Props = {
  loading: boolean;
  announcements: AnnouncementType[];
  deleteAnnouncement?: (_id: AnnouncementType["_id"]) => void;
  setSelectedAnnouncement?: React.Dispatch<
    React.SetStateAction<AnnouncementType | null>
  >;
  displayActions?: boolean;
};

const AnnouncementsList: React.FC<Props> = ({
  loading,
  announcements,
  deleteAnnouncement,
  setSelectedAnnouncement,
  displayActions,
}) => {
  const [t] = useTranslation();

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        paddingX: 5,
        paddingY: 3,
        height: "fit-content",
        flexGrow: 1,
      }}
    >
      <Typography variant="h5" component="h3" sx={{ fontWeight: 500 }}>
        {t("announcements")}
      </Typography>
      {!loading && announcements ? (
        <AnnouncementsTimeline
          announcements={announcements}
          deleteAnnouncement={deleteAnnouncement}
          setSelectedAnnouncement={setSelectedAnnouncement}
          displayActions={displayActions}
        />
      ) : (
        <p> {t("loading")}</p>
      )}
    </Paper>
  );
};

export default AnnouncementsList;
