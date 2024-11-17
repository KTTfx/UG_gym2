interface SubscriptionCardProps {
  title: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

export default function SubscriptionCard({
  title,
  price,
  duration,
  features,
  isPopular,
  onSelect
}: SubscriptionCardProps) {
  return (
    <div className={`relative rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 ${
      isPopular ? 'border-2 border-[#FFD700] bg-[#002147] text-white' : 'bg-white'
    }`}>
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#002147] px-6 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">GH₵{price}</span>
        <span className={`${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>/{duration}</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <svg className={`w-5 h-5 ${isPopular ? 'text-[#FFD700]' : 'text-[#002147]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
          isPopular
            ? 'bg-[#FFD700] text-[#002147] hover:bg-yellow-400'
            : 'bg-[#002147] text-white hover:bg-[#003167]'
        }`}
      >
        Select Plan
      </button>
    </div>
  );
}