import Timeline from "@mui/lab/Timeline";
import SingleAnnouncement from "./SingleAnnouncement";
import AnnouncementType from "../../types/AnnouncementType";

type Props = {
  announcements: AnnouncementType[];
  deleteAnnouncement?: (_id: AnnouncementType["_id"]) => void;
  setSelectedAnnouncement?: React.Dispatch<
    React.SetStateAction<AnnouncementType | null>
  >;
  displayActions?: boolean;
};

const AnnouncementsTimeline: React.FC<Props> = ({
  announcements,
  deleteAnnouncement,
  setSelectedAnnouncement,
  displayActions,
}) => {
  return (
    <Timeline sx={{ marginTop: "1rem", padding: 0 }}>
      {announcements.map((announcement, index) => (
        <SingleAnnouncement
          key={announcement._id}
          announcement={announcement}
          lastElement={index + 1 === announcements.length}
          deleteAnnouncement={deleteAnnouncement}
          setSelectedAnnouncement={setSelectedAnnouncement}
          displayActions={displayActions}
        />
      ))}
    </Timeline>
  );
};

export default AnnouncementsTimeline;
