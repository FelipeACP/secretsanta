import christmasWreath from "../../static/christmas-wreath.svg";
import giftBox from "../../static/gift-box.svg";

interface PostCardProps {
  children: React.ReactNode;
  className?: string;
}

export function PostCard({ children, className = "" }: PostCardProps) {
  return (
    <div
      className={`shadow-md relative z-10 transform transition-transform duration-300 p-2 sm:p-3 bg-postcard rounded-lg w-full ${className}`}
    >
      <div className="relative p-4 sm:p-6 md:p-8 bg-white rounded-md overflow-hidden">
        <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 bg-[#5CC48A] rounded-full flex items-center justify-center transform -rotate-12 shadow-sm">
          <img className={`w-full h-full`} src={christmasWreath} />
        </div>

        <div className="min-w-0 w-full">{children}</div>

        <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-[#EF3D3D] rounded-full flex items-center justify-center transform rotate-12 shadow-sm">
          <img className={`w-full h-full`} src={giftBox} />
        </div>
      </div>
    </div>
  );
}
