import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const UserType = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };
  return (
    <div>
      <Select
        value={userType}
        onValueChange={(type: UserType) => accessChangeHandler(type)}
      >
        <SelectTrigger className="bg-black h-full rounded-none border-y-0 border-r-0 w-max border-l-2 border-l-[#9fffcb] ">
          <SelectValue  />
        </SelectTrigger>
        <SelectContent className="bg-black border-2 border-[#9fffcb]">
        <SelectItem value="viewer">Can View.</SelectItem>
          <SelectItem value="editor">Can Edit.</SelectItem>

        </SelectContent>
      </Select>
    </div>
  );
};

export default UserType;
