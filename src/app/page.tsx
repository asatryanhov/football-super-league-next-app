// import App from "@/components/App";
import App from "@/components/App";
import League from "@/components/League";

// Принудительно делаем страницу динамической чтобы избежать API лимитов во время build
export const dynamic = "force-dynamic";

//update
export default function Home() {
  return (
    <>
      <League />
      <App />
    </>
  );
}
