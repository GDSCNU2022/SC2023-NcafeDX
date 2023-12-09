import GlobalNavBar from "@src/components/User/GlobalNavBar";
import { useEffect } from "react";
import { submitPasswordResetEmail } from "../api/verifications";

const ResetPassword = () => {

  return(
    <>
    <GlobalNavBar/>
      <p>
        パスワード再設定用のメールを登録されているメールアドレスに送信しました．
      </p>
    </>
  )
};

export default ResetPassword;