export type CardDirection = "row" | "column";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: CardDirection;
}
