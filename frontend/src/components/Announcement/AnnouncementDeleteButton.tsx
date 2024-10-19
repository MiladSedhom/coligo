import { FiTrash2 } from "react-icons/fi";
import { useEffect } from "react";
import { useAxios } from "hookverse";
import AnnouncementType from "../../types/AnnouncementType";

type Props = {
  id: AnnouncementType["_id"];
  deleteAnnouncement: (_id: AnnouncementType["_id"]) => void;
};

const AnnouncementDeleteButton: React.FC<Props> = ({
  id,
  deleteAnnouncement,
}) => {
  const {
    runAxios: runDeleteAnnouncement,
    loading: deleteLoading,
    error: deleteError,
  } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/announcement/${id}`,
    method: "DELETE",
  });

  useEffect(() => {
    if (!deleteError && !deleteLoading) {
      deleteAnnouncement(id);
    }
  }, [deleteError, deleteLoading, deleteAnnouncement, id]);

  return (
    <button onClick={runDeleteAnnouncement}>
      <FiTrash2 />
    </button>
  );
};

export default AnnouncementDeleteButton;
