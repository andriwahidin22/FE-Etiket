import Image from "next/image";

export default function Hero({ title, imgUrl }) {
  return (
    <div className="relative h-[400px]">
      <Image
        src={imgUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
          {title}
        </h1>
      </div>
    </div>
  );
}