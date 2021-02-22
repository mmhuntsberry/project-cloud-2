import React from "react";
import { Button } from "carbon-components-react";

type Props = {
  onClick: (evt: React.MouseEvent<HTMLButtonElement>, text: string) => void;
};

export const CustomButton = ({ onClick }: Props) => {
  return <Button onClick={onClick}>Click Me</Button>;
};
