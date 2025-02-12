import { DARK_COLOR } from '../constants';

export const getIconColorWithStatus = ({
  isActived,
}: {
  isActived: boolean;
}): { strokeWith: number; fill: string } => {
  const strokeWith = isActived ? 0 : 3;
  const fill = isActived ? DARK_COLOR : 'none';
  return { strokeWith, fill };
};
