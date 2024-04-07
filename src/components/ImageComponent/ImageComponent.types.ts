export type IProps = {
  index: number;
  complete: boolean;
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
  keyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};
