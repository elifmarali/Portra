import RegisterComponent from "@/components/Auth/RegisterComponent";
import {Suspense} from "react";

function Register() {
  return (
    <Suspense>
      <RegisterComponent />
    </Suspense>
  );
}

export default Register;
