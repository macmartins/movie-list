import { Backdrop, Box, Popover, Typography } from "@mui/material";
import * as styles from "./styles";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  selectIsSelectYearModalOpen,
  setIsSelectedYearModalOpen,
  setSort,
  setYear,
} from "@/store/movies/moviesSlice";
import { getYears } from "@/helpers/movies";
import SORT from "@/enums/sort";
import STRINGS from "@/constants/strings";
import SelectYearProps from "@/interfaces/selectYearProps.interface";

export default function SelectYear({ anchorEl }: SelectYearProps) {
  const dispatch = useAppDispatch();

  const isSelectYearOpen = useAppSelector(selectIsSelectYearModalOpen);

  const handleBackdropClick = () => {
    dispatch(setIsSelectedYearModalOpen(false));
  };

  const handleYearClick = (year: number) => {
    dispatch(setYear(year));
    dispatch(setSort(SORT.REVENUE));
  };

  return (
    <Backdrop
      sx={styles.backdrop}
      open={isSelectYearOpen}
      onClick={handleBackdropClick}
    >
      <Popover
        open={isSelectYearOpen}
        anchorEl={anchorEl}
        anchorOrigin={styles.popoverAnchor}
        transformOrigin={styles.popoverTransform}
      >
        <Box sx={styles.filtersContainer}>
          <Typography variant="body1" sx={styles.label}>
            {STRINGS.yearLabel}
          </Typography>
          {getYears()
            .reverse()
            .map((year) => (
              <Typography
                key={`year-${year}`}
                variant="body1"
                sx={styles.year}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </Typography>
            ))}
        </Box>
      </Popover>
    </Backdrop>
  );
}
