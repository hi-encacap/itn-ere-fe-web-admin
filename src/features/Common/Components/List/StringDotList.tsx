import { BsDot } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export interface StringDotListProps {
  className?: string;
  strings: string[];
}

const StringDotList = ({ strings, className }: StringDotListProps) => {
  return (
    <div className={twMerge("flex flex-col space-y-1.5", className)}>
      {strings.map((string, index) => (
        // #skipcq: JS-0437
        <div className="flex" key={index}>
          <BsDot size={20} className="-ml-2 mr-2 flex-shrink-0" />
          {string}
        </div>
      ))}
    </div>
  );
};

export default StringDotList;
