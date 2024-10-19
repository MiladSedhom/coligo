import Typography from "@mui/material/Typography";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AnnouncementType from "../../types/AnnouncementType";
import AnnouncementDeleteButton from "./AnnouncementDeleteButton";
import AnnouncementUpdateButton from "./AnnouncementUpdateButton";

type Props = {
  announcement: AnnouncementType;
  lastElement: boolean;
  deleteAnnouncement?: (_id: AnnouncementType["_id"]) => void;
  setSelectedAnnouncement?: React.Dispatch<
    React.SetStateAction<AnnouncementType | null>
  >;
  displayActions?: boolean;
};

const SingleAnnouncement: React.FC<Props> = ({
  announcement,
  lastElement,
  deleteAnnouncement,
  setSelectedAnnouncement,
  displayActions,
}) => {
  return (
    <TimelineItem sx={{ minHeight: "60px" }}>
      <TimelineSeparator>
        <TimelineDot />
        {!lastElement && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1" component="p">
          {announcement.text}
        </Typography>
        {displayActions && (
          <>
            <AnnouncementDeleteButton
              id={announcement._id}
              deleteAnnouncement={deleteAnnouncement!}
            />
            <AnnouncementUpdateButton
              announcement={announcement}
              setSelectedAnnouncement={setSelectedAnnouncement!}
            />
          </>
        )}
      </TimelineContent>
    </TimelineItem>
  );
};

export default SingleAnnouncement;
