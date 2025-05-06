import Image from "next/image";

export default function Gallery({ items, cols = 3 }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-8`}>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
          <div className="h-48 relative">
            <Image
              src={item.img}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}