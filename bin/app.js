/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2022-11-01
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";

// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";

// MySQL Sequelize
import DB from "../models/index.js";

// session용 3rd party
import session from "express-session";
import sessionSequelize from "connect-session-sequelize";

// sample router modules
import indexRouter from "../routes/index.js";
import userRouter from "../routes/user.js";
import communityRouter from "../routes/community.js";
import createrAPI from "../routes/createrAPI.js";
import videoRouter from "../routes/video.js";
import kakaoRouter from "../routes/kakaoAPI.js";

// scheduler
import { scheduleJob } from "node-schedule";
import { removeAttach } from "../modules/remove_attach.js";
import { removePost } from "../modules/remove_post.js";
import { importBoard } from "../modules/import_board.js";

// create express framework
const app = express();

DB.sequelize.sync({ force: false }).then((dbConn) => {
  console.log(dbConn.options.host, dbConn.config.database, "DB Connection OK");
});

const SessionStore = sessionSequelize(session.Store);
// session 클래스 설정
const sessionStore = new SessionStore({
  db: DB.sequelize,
  expiration: 1000 * 60 * 10,
  checkExpirationInterval: 1000 * 60 * 10,
});
// app.use 로 세션 설정

app.use(
  session({
    key: "ProjectHowDo",
    secret: "ProjectHowDo",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

// Disable the fingerprinting of this web technology.
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "pug");

// middleWare enable
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("react-client/build")));
// 첫번째 인수 /public 은 미디어 파일 get 경로 설정
app.use("/public", express.static(path.join("public")));

// router link enable
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/community", communityRouter);
app.use("/mypage", createrAPI);
app.use("/video", videoRouter);
app.use("/kakao", kakaoRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// import board data
app.listen(process.env.PORT, async () => {
  await importBoard();
});

// execute scheduler
app.listen(process.env.PORT, () => {
  /**
   * 게시되지 않은 첨부파일 완전 삭제(modules/attach_remove.js)
   * 저번 주 동안 deleted 된 게시글을 댓글 + 첨부파일과 함께 완전 삭제(modules/post_remove.js)
   * 서버가 켜져 있을 때 매일 자정에 실행 : 0 0 0 * * *
   */
  // 테스트용 5초마다 실행 : */5 * * * * *
  scheduleJob("0 0 0 * * *", async () => {
    await removeAttach();
    await removePost();
  });
});

export default app;
