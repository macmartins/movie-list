import {
  Box,
  Divider,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import FieldSection from "../DetailsField/DetailsField";
import { useGetMovieByIdQuery } from "@/services/movies";
import CloseIcon from "@mui/icons-material/Close";
import * as styles from "./styles";
import COLORS from "@/constants/colors";
import STRINGS from "@/constants/strings";
import MovieDetailsProps from "@/interfaces/movieDetailsProps.interface";

const MovieDetails = ({ id, onClose }: MovieDetailsProps) => {
  const { data: movie } = useGetMovieByIdQuery(id);

  return (
    <Modal open={true} sx={styles.modal}>
      <Box sx={styles.content}>
        <Box sx={styles.closeBtnContainer}>
          <IconButton disableRipple onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography>{STRINGS.close}</Typography>
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: COLORS.detailsTitle,
          }}
        >
          {movie?.title}
        </Typography>
        <Divider sx={styles.divider} />
        <FieldSection
          title="Year"
          value={new Date(movie?.release_date || new Date()).getFullYear()}
        />
        <FieldSection title="Genre" value={movie?.genres.join(", ") || "---"} />
        <FieldSection title="Description" value={movie?.overview} />
        <Grid container columnSpacing={5}>
          <Grid item xs={12} lg={2}>
            <FieldSection
              title="Director"
              value={movie?.director}
              valueSX={{
                color: COLORS.buttonToggled,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={10}>
            <FieldSection
              title="Actors"
              value={movie?.actors?.slice(0, 4).join("     ") || "-"}
              valueSX={{
                color: COLORS.buttonToggled,
              }}
            />
          </Grid>
        </Grid>
        <FieldSection title="Runtime" value={`${movie?.runtime} mins`} />
        <FieldSection title="Rating" value={movie?.vote_average} />
        <FieldSection title="Votes" value={movie?.vote_count} />
        <FieldSection
          title="Revenue"
          value={`$${movie?.revenue.toLocaleString("en-US")}`}
        />
        <FieldSection title="Metascore" value={movie?.metascore} />
      </Box>
    </Modal>
  );
};

export default MovieDetails;
