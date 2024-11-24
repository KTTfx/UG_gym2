interface SubscriptionCardProps {
  title: string;
  price: number;
  duration: string;
  isPopular?: boolean;
  onSelect: () => void;
  disabled?: boolean; // New prop
}

export default function SubscriptionCard({
  title,
  price,
  duration,
  isPopular,
  onSelect,
  disabled = false, // Default value
}: SubscriptionCardProps) {
  return (
    <div
      className={`relative rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 ${
        isPopular ? 'border-2 border-[#FFD700] bg-[#002147] text-white' : 'bg-white'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#002147] px-6 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">GH₵{price}</span>
      </div>
      <button
        onClick={onSelect}
        disabled={disabled}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
          disabled
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : isPopular
            ? 'bg-[#FFD700] text-[#002147] hover:bg-yellow-400'
            : 'bg-[#002147] text-white hover:bg-[#003167]'
        }`}
      >
        {disabled ? 'Pending Subscription' : 'Select Plan'}
      </button>
    </div>
  );
}
