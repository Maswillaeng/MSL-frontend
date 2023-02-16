import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateToken = () => {
  const navigation = useNavigate();
  useEffect(() => {
    const updateToken = async () => {
      navigation(-1);
    };
    updateToken();
  }, []);
};

export default UpdateToken;
