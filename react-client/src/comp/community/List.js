// 게시글 목록: Category 와 Detail 에 포함
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const List = ({ data }) => {
  const ListItem = () => {
    return data.map((item) => {
      return (
        <Link
          to={`/community/${item["board.b_eng"]}/${item.p_code}`}
          className="list-item p-3 border-b border-slate-300"
          key={item.p_code}
        >
          <div className="title font-semibold text-lg">{item.p_title}</div>
          <div className="date text-sm flex justify-end items-end">{`${item.p_date} ${item.p_time}`}</div>
          <div className="nickname text-sm flex items-center">
            {item.username}
          </div>
          <div className="detail-box text-right">
            <EyeIcon className="inline-block h-5 w-5 text-slate-500" />
            <span className="mr-4">{item.p_views}</span>
            <HandThumbUpIcon className="inline-block h-5 w-5 text-slate-500" />
            <span className="mr-4">{item.p_upvote}</span>
            <ChatBubbleOvalLeftEllipsisIcon className="inline-block h-5 w-5 text-slate-500" />
            <span>{item.p_replies}</span>
          </div>
        </Link>
      );
    });
  };

  return (
    <section className="commu-list w-full">
      <ul className="item-wrapper w-full">
        <ListItem />
      </ul>
    </section>
  );
};

export default List;
