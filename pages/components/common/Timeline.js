export default function Timeline({ items }) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div key={index} className="bg-[#f9f9f9] p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-[#7C4A00]">{item.year}</h3>
            <h4 className="text-md font-medium mb-2">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    );
  }