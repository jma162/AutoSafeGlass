const HowItWorks = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 border-t-2 border-gray-300">
      {/* Logo */}
      <div className="text-center mb-10">
        <h2 className="text-[#00a080] text-4xl font-bold tracking-wide">AUTO SAFE GLASS</h2>
      </div>

      {/* Features in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 max-w-4xl mx-auto">
        {/* Left column */}
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="text-[#00a0c0] text-2xl mr-3">›</span>
            <p className="text-[#333] text-xl">All your auto glass needs</p>
          </div>
          <div className="flex items-center">
            <span className="text-[#00a0c0] text-2xl mr-3">›</span>
            <p className="text-[#333] text-xl">High quality & safety</p>
          </div>
          <div className="flex items-center">
            <span className="text-[#00a0c0] text-2xl mr-3">›</span>
            <p className="text-[#333] text-xl">Professional installation</p>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="text-[#00a000] text-xl mr-3">✓</span>
            <p className="text-[#333] text-xl">All insurance accepted</p>
          </div>
          <div className="flex items-center">
            <span className="text-[#00a000] text-xl mr-3">✓</span>
            <p className="text-[#333] text-xl">Low cost & great service</p>
          </div>
          <div className="flex items-center">
            <span className="text-[#00a000] text-xl mr-3">✓</span>
            <p className="text-[#333] text-xl">Lifetime warranty</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
