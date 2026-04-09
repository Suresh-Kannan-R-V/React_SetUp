import { useInitialSetUpStore } from "@/store/initialSetUp";
import { PATH } from "@/router/path";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import React from "react";
import OnBoard from "./onBoard";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@heroui/react";

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUserLoginData } = useInitialSetUpStore();

  const handleSubmit = () => {};

  const handleOnSuccess = (loginResponse: any) => {
    console.log(loginResponse);
    const decodedData = jwtDecode<any>(loginResponse.credential);
    setUserLoginData(decodedData);
    navigate(`${PATH.dashBoard}`);
  };

  const handleOnError = () => {
    console.log("Login Failed:");
    navigate(`${PATH.signIn}`);
  };

  return (
    <OnBoard>
      <div>
        <form onSubmit={() => handleSubmit()} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" color="primary">
            Sign In
          </Button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-t-1" />
          <span className=" mx-3 text-xs text-content1">Or continue with</span>
          <hr className="flex-1 border-t-1" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(res) => handleOnSuccess(res)}
            onError={() => handleOnError()}
          />
        </div>
      </div>
    </OnBoard>
  );
};
