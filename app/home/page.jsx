import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default function HomePage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <HomeClient />
      </Suspense>
    </main>
  );
}
