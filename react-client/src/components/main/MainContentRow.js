import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "@contexts/PostContextProvider";
import { useTransferContext } from "@contexts/TransferContextProvider";
import { useVideoContentContext } from "@contexts/VideoContentContextProvider";
import { getReply } from "@services/post.service";

const MainContentRow = () => {
  const { contentButton } = useTransferContext();
  const {
    videoItemList,
    onClickDetailHandler,
    setVideoItemList,
    setReplyList,
  } = useVideoContentContext();
  const { setReplyCount } = usePostContext();
  const nav = useNavigate();

  useEffect(() => {
    const item = async () => {
      const res = await fetch("/video/main");
      const result = await res.json();
      let tempArray = [...result];
      tempArray.sort(() => Math.random() - 0.5);
      setVideoItemList([...tempArray]);
    };
    item();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickHandler = async (e) => {
    const v_code = e.target.dataset.v_code;
    await onClickDetailHandler(v_code);
    const reply = await getReply(v_code);
    console.log(reply);
    setReplyList(reply?.list);
    setReplyCount(reply?.count);
    return nav(`/video/detail/${v_code}`);
  };

  const videoView = videoItemList.map((video) => {
    return (
      <div
        data-v_code={video.v_code}
        key={video.v_code}
        onClick={onClickHandler}
        className={
          contentButton
            ? "m-8 flex w-80 h-64 flex-col justify-center items-center shadow-lg p-3"
            : "hidden"
        }
      >
        <iframe
          className="w-full h-full columns-1 aspect-video border-black border-1"
          src={video.v_src}
          title="video"
        ></iframe>
        <div className="item-left">
          <img data-v_code={video.v_code} alt="profile"></img>
          <h3 data-v_code={video.v_code}>{video.v_title}</h3>
          <h6 data-v_code={video.v_code}>{video.username}</h6>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full text-center ">
      <div className="grid grid-cols-4">{videoView}</div>
    </div>
  );
};

export default MainContentRow;
