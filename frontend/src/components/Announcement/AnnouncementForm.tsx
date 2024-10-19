import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useAxios } from "hookverse";
import AnnouncementType from "../../types/AnnouncementType";
import { useTranslation } from "react-i18next";

type Props = {
  selectedAnnouncement: AnnouncementType | null;
  setSelectedAnnouncement: React.Dispatch<
    React.SetStateAction<AnnouncementType | null>
  >;
  addAnnouncement: (newAnnouncement: AnnouncementType) => void;
  updateAnnouncement: (
    _id: AnnouncementType["_id"],
    newText: AnnouncementType["text"]
  ) => void;
};

const AnnouncementForm: React.FC<Props> = ({
  selectedAnnouncement,
  setSelectedAnnouncement,
  addAnnouncement,
  updateAnnouncement,
}) => {
  const [t] = useTranslation();

  const [text, setText] = useState("");

  useEffect(() => {
    setText(selectedAnnouncement?.text || "");
  }, [selectedAnnouncement]);

  const { data: newAnnouncement, runAxios: createAnnouncement } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/announcement`,
    method: "POST",
    body: { text },
  });

  useEffect(() => {
    if (newAnnouncement) {
      addAnnouncement(newAnnouncement);
    }
  }, [newAnnouncement, addAnnouncement]);

  const { data: updatedAnnouncement, runAxios: patchAnnouncement } = useAxios({
    url: `${import.meta.env.VITE_API_URL}/announcement/${
      selectedAnnouncement?._id
    }`,
    method: "PATCH",
    body: { text },
  });

  useEffect(() => {
    if (updatedAnnouncement) {
      updateAnnouncement(updatedAnnouncement._id, updatedAnnouncement.text);
    }
  }, [updatedAnnouncement, updateAnnouncement]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedAnnouncement) {
      await patchAnnouncement();
      setSelectedAnnouncement(null);
    } else {
      await createAnnouncement();
    }

    setText("");
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        paddingX: "1.25rem",
        paddingY: "3rem",
        borderRadius: "10px",
        height: "fit-content",
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{ fontWeight: "medium", textTransform: "capitalize" }}
      >
        {selectedAnnouncement ? t("updateAnnouncement") : t("newAnnouncement")}
      </Typography>
      <form
        onSubmit={submitHandler}
        style={{
          marginTop: "1rem",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            id="name"
            label="Announcement Title"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            sx={{ flexGrow: 1, width: { md: "250px" } }}
          />
          <Button variant="contained" type="submit" fullWidth>
            {t("submit")}
          </Button>
          {selectedAnnouncement && (
            <Button
              variant="contained"
              fullWidth
              onClick={() => setSelectedAnnouncement(null)}
            >
              {t("cancel")}
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default AnnouncementForm;
