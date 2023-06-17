import { MouseEvent } from "react";

export default interface FilterButtonProps {
  handleTop10RevenueClick: () => void;
  handleTop10RevenueByYearClick: (event: MouseEvent<HTMLElement>) => void;
}
