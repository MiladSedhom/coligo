import { GoPencil } from "react-icons/go";
import AnnouncementType from "../../types/AnnouncementType";

type Props = {
  announcement: AnnouncementType;

  setSelectedAnnouncement: React.Dispatch<
    React.SetStateAction<AnnouncementType | null>
  >;
};

const AnnouncementUpdateButton: React.FC<Props> = ({
  announcement,
  setSelectedAnnouncement,
}) => {
  const clickHandler = () => {
    setSelectedAnnouncement(announcement);
  };

  return (
    <button onClick={clickHandler} style={{ marginLeft: "0.5rem" }}>
      <GoPencil />
    </button>
  );
};

export default AnnouncementUpdateButton;
