import { NavLink } from "react-router-dom";

const BoardLinks = ({ data }) => {
  // 그룹별로
  const Contents = () => {
    return data?.map((item) => {
      if (item.b_group_code === "B1") {
        return (
          <NavLink
            key={item?.b_code}
            className="board-link"
            to={`/community/${item?.b_eng}`}
          >
            {item.b_kor}
          </NavLink>
        );
      } else {
        return (
          <NavLink
            key={item?.b_code}
            className="board-link"
            to={`/community/${item?.b_eng}`}
          >
            {item?.b_kor}
          </NavLink>
        );
      }
    });
  };
  return (
    <nav className="board-nav w-full flex gap-5 p-5">
      <Contents />
    </nav>
  );
};

export default BoardLinks;
