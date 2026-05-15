import React, { Suspense } from "react";
import ResetForm from "./ResetForm";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <ResetForm />
    </Suspense>
  );
}
