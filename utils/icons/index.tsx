export const getIconColorWithStatus = ({
  isActived,
}: {
  isActived: boolean;
}): { strokeWith: number; fill: string } => {
  const strokeWith = isActived ? 0 : 3;
  const fill = isActived ? 'black' : 'none';
  return { strokeWith, fill };
};
