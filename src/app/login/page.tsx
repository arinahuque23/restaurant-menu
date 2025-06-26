import Authentication from "@/modules/Authentication/Authentication";
import { Suspense } from "react";

const login = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Authentication />
      </Suspense>
    </>
  );
};

export default login;
