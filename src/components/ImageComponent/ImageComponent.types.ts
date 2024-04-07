export type IProps = {
  index: number;
  complete: boolean;
  active: boolean;
  setActive: () => void;
  children: React.ReactNode;
  keyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
};
