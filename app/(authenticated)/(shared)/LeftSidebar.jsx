import PopularGigs from "./PopularGigs";
import SuggestedCard from "./SuggestedCard";
import TrendingTagsCard from "./TrendingTagsCard";

const LeftSidebar = () => {
  return (
    <nav className="w-0 p-4 h-full hidden 2xl:w-1/5 2xl:flex 2xl:flex-col gap-y-4">
      <SuggestedCard />
      <TrendingTagsCard />
      <PopularGigs />
    </nav>
  );
};

export default LeftSidebar;
