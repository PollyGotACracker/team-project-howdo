import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@contexts/UserContextProvider";
import { fetchLogin } from "@services/auth.service";

const Login = () => {
  const { login, setLogin, loginError, setLoginError, setUserSession } =
    useUserContext();

  const nav = useNavigate();

  const onClickHandler = async () => {
    const result = await fetchLogin(login);
    if (result.CODE) {
      setLoginError({ ...result });
    }
    setUserSession(result);
    if (result.username) nav("/");
    console.log(result);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setLoginError({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 m-auto">
        <div className="w-96 max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              HowDo
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              노하우를 얻어가세요
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={submitHandler}
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label className="sr-only">Email address</label>
                <input
                  name="id"
                  type="email"
                  onChange={onChangeHandler}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  name="password"
                  type="password"
                  onChange={onChangeHandler}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* <div className="text-sm text-right">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                비밀번호 찾기
              </a>
            </div> */}
            {loginError.CODE ? (
              <p className="text-red-500 text-right">{loginError.MESSAGE}</p>
            ) : (
              ""
            )}

            <div>
              <button
                onClick={onClickHandler}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
