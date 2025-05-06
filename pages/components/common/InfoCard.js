import Image from "next/image";

export default function InfoCard({ title, description, imgUrl, reverse = false }) {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} gap-10 mb-16`}>
      <div className="md:w-2/3">
        <h2 className="text-2xl font-semibold mb-6 text-[#7C4A00]">{title}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {description}
        </div>
      </div>
      <div className="md:w-1/3">
        <Image
          src={imgUrl}
          alt={title}
          width={400}
          height={300}
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}