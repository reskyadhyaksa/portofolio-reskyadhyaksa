  import TileGrid from "../../component/tilegrid";
import TradingDashboard from "./trading-page";

export default function TradingPage() {
  return(
    <div className="bg-primary relative min-h-screen w-full overflow-hidden">
      <main className="pointer-events-none relative z-10 flex w-full flex-col text-white lg:px-42 py-20">
        <TradingDashboard/>
      </main>
      <TileGrid />
    </div>
  )
}