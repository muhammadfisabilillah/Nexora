import { Suspense } from "react";
import VerifyForm from "./VerifyForm";

export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Loading verification...</p>}>
      <VerifyForm />
    </Suspense>
  );
}