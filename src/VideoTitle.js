

const VideoTitle = ({title,overview}) => {
  return (
    <div className="pt-[20%] w-screen aspect-video bg-gradient-to-r from-black  px-24 absolute text-white">
        <div className="">
        <h1 className="text-6xl font-bold">{title }</h1>
        <p className="py-6 text-lg w-1/3 ">{overview}</p>
        </div>

        <div>
            <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:opacity-80">Play</button>
            <button className=" mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hover:opacity-80">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle