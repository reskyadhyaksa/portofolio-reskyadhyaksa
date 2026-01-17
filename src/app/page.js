import Image from "next/image";
import TileGrid from "./component/tilegrid";
import NavigationBar from "./component/navbar";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black font-sans overflow-hidden relative">
      <div className="flex w-full fixed z-10 top-4 justify-center">
        <NavigationBar/>
      </div>
      <TileGrid />
    </div>
  );
}
