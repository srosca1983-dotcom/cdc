import { createFileRoute } from "@tanstack/react-router";
import { Screener } from "@/components/cdc/screener";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Screener />;
}
