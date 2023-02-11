import { useContext } from "react";
import SignInputContext from "../../context/check-signInput-context";

const PhoneInput = () => {
  const { info, updatePhoneInfo } = useContext(SignInputContext);
  const { phoneInfo } = info;
  const { error } = phoneInfo;

  const certificateUser = () => {
    const IMP = window.IMP;
    IMP.init("imp73616437");

    IMP.certification(
      {
        m_redirect_url: "{리디렉션 될 URL}",
      },
      (res) => {
        console.log(res);
        if (res.success) {
          console.log("hi");
          (async () => {
            const response = await fetch("http://localhost:3000", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ imp_uid: res.imp_uid }),
            });
          })();
          updatePhoneInfo(true, false);
        } else {
          updatePhoneInfo(false, true);
        }
      }
    );
  };

  return (
    <>
      <button
        className={`mb-5 button border-2 ${
          error ? " border-red-600" : "border-green-600"
        }`}
        onClick={certificateUser}
        type="button"
      >
        휴대폰 본인 인증하기
      </button>
    </>
  );
};

export default PhoneInput;
