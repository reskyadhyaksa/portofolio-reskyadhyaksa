import Image from "next/image";

export default function PhotoCard() {
  return(
    <div className="3xl:h-172.5 3xl:w-125 hidden h-136 w-100 -translate-x-2 -translate-y-3 place-items-center overflow-hidden rounded-lg border border-white/20 backdrop-blur-xl lg:inline">
      <div className="flex w-full place-items-center justify-between bg-white/5 px-5 py-3 backdrop-blur-xl">
        <div className="pointer-events-auto flex place-items-center justify-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-red-400/80 bg-red-400/60 hover:bg-red-400"></span>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-yellow-400/80 bg-yellow-400/60 hover:bg-yellow-400"></span>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-green-400/80 bg-green-400/60 hover:bg-green-400"></span>
        </div>
        <p className="text-xs text-white/50">PROFILE_RENDER.EXE</p>
      </div>
      <div className="3xl:h-125 mt-2 mb-2 h-96 w-[97%] place-items-center justify-center bg-white/5 backdrop-blur-xl">
        <span className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-blue-500" />
        <span className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-blue-500" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-blue-500" />
        <span className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-blue-500" />

        <div className="pointer-events-auto fixed top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white">
          <Image
            src="/ME.jpg"
            fill
            alt="Resky Adhyaksa"
            className="-translate-y-32 scale-200 object-cover"
          />
          <p className="fixed bottom-0 rounded-tr-sm border-white/5 bg-white/50 px-2 py-1 text-xs text-white backdrop-blur-xl">
            Location: MT. Prau
          </p>
        </div>
      </div>
      <div className="flex h-full w-full flex-col bg-white/5 py-3 text-xs text-white/50 backdrop-blur-xl">
        <p className="whitespace-pre text-blue-400">
          {"\t"}class{" "}
          <span className="text-yellow-300">Professional</span>:
        </p>
        <p className="whitespace-pre text-pink-300">
          {"\t\t"}def <span className="text-blue-400">__init__</span>
          <span className="text-white">(self):</span>
        </p>
        <p className="whitespace-pre">
          {"\t\t\t"}self.name ={" "}
          <span className="text-green-300">
            {'"'}Resky Adhyaksa{'"'}
          </span>
        </p>
        <p className="whitespace-pre">
          {"\t\t\t"}self.role ={" "}
          <span className="text-green-300">
            {'"'}HC Service & Inf. System - Staff{'"'}
          </span>
        </p>
        <p className="whitespace-pre">
          {"\t\t\t"}self.focus = [
            <span className="text-green-300">
              {'"'}ML{'"'}
            </span>
            ,
            <span className="text-green-300">
              {'"'}FE{'"'}
            </span>
            ,
            <span className="text-green-300">
              {'"'}IT{'"'}
            </span>
          ]
        </p>
      </div>
    </div>
  )
}