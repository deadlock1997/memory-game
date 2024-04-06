export type IProps = {
    complete: boolean
    active: boolean;
    setActive: (active: boolean) => void;
    children: React.ReactNode;
}