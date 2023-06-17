import { Box } from "@mui/material";
import * as styles from "./styles";
import CustomToggleButton from "../CustomToggleButton";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import {
  selectIsSelectYearModalOpen,
  selectSort,
  selectYear,
  setSort,
  setYear,
} from "@/store/movies/moviesSlice";
import SORT from "@/enums/sort";
import RefreshIcon from "@/assets/refresh.svg";
import STRINGS from "@/constants/strings";
import FilterButtonProps from "@/interfaces/filterButtonProps.interface";

export default function FilterButtons({
  handleTop10RevenueClick,
  handleTop10RevenueByYearClick,
}: FilterButtonProps) {
  const sort = useAppSelector(selectSort);
  const year = useAppSelector(selectYear);
  const isSelectYearOpen = useAppSelector(selectIsSelectYearModalOpen);
  const isTitleSort = sort === SORT.TITLE;

  const dispatch = useAppDispatch();

  const handleResetClick = () => {
    dispatch(setSort(SORT.TITLE));
    dispatch(setYear(undefined));
  };

  return (
    <Box sx={styles.container}>
      <CustomToggleButton
        value="top10Revenue"
        selected={!isTitleSort && !year}
        onClick={handleTop10RevenueClick}
      >
        {STRINGS.top10Revenue}
      </CustomToggleButton>
      <CustomToggleButton
        value="top10RevenueByYear"
        selected={(!isTitleSort && !!year) || isSelectYearOpen}
        onClick={handleTop10RevenueByYearClick}
      >
        {STRINGS.top10RevenueByYear(year?.toString() ?? "by Year")}
      </CustomToggleButton>
      {!isTitleSort ? (
        <Box
          component="img"
          src={RefreshIcon}
          alt="Reset"
          sx={{
            cursor: "pointer",
          }}
          onClick={handleResetClick}
        />
      ) : null}
    </Box>
  );
}
