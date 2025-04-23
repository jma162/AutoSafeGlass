const About = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-[montserratSemiBold] text-center mb-12">
        Our Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Windshield replacement */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-sky-500 mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 20C52.7614 20 55 22.2386 55 25C55 27.7614 52.7614 30 50 30C47.2386 30 45 27.7614 45 25C45 22.2386 47.2386 20 50 20Z"
                stroke="#00a000"
                strokeWidth="2"
              />
              <path d="M50 25V15" stroke="#00a000" strokeWidth="2" />
              <path d="M50 25L60 35" stroke="#00a000" strokeWidth="2" />
              <path d="M25 75H75" stroke="#00a000" strokeWidth="2" />
              <path d="M30 75V65H70V75" stroke="#00a000" strokeWidth="2" />
              <path d="M35 65H65V55H35V65Z" stroke="#00a000" strokeWidth="2" />
              <path d="M25 55H35M65 55H75" stroke="#00a000" strokeWidth="2" />
              <circle cx="40" cy="75" r="3" stroke="#00a000" strokeWidth="2" />
              <circle cx="60" cy="75" r="3" stroke="#00a000" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-[montserratSemiBold] mb-3">Windshield replacement </h3>
        </div>

        {/* Rock chip repair */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-sky-500 mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M35 25H65V75H35V25Z" stroke="#00a000" strokeWidth="2" />
              <path d="M45 35H55" stroke="#00a000" strokeWidth="2" />
              <path d="M45 45H55" stroke="#00a000" strokeWidth="2" />
              <path d="M45 55H55" stroke="#00a000" strokeWidth="2" />
              <path d="M40 35H42" stroke="#00a000" strokeWidth="2" />
              <path d="M40 45H42" stroke="#00a000" strokeWidth="2" />
              <path d="M40 55H42" stroke="#00a000" strokeWidth="2" />
              <circle cx="60" cy="65" r="10" stroke="#00a000" strokeWidth="2" />
              <path d="M55 65L58 68L65 61" stroke="#00a000" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-[montserratSemiBold] mb-3">Rock chip repair</h3>
  
        </div>

        {/* Door glass replacement */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-sky-500 mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 20L80 30V50C80 65 65 75 50 80C35 75 20 65 20 50V30L50 20Z"
                stroke="#00a000"
                strokeWidth="2"
              />
              <path d="M40 40L60 60" stroke="#00a000" strokeWidth="2" />
              <path d="M60 40L40 60" stroke="#00a000" strokeWidth="2" />
              <path d="M35 50H65" stroke="#00a000" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-[montserratSemiBold] mb-3">Door glass replacement</h3>
        </div>

        {/* Back window replacement */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-sky-500 mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="30" stroke="#00a000" strokeWidth="2" />
              <circle cx="50" cy="50" r="25" stroke="#00a000" strokeWidth="2" />
              <path
                d="M30 30L70 70"
                stroke="#00a000"
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(45 50 50)"
              />
              <path
                d="M30 30L70 70"
                stroke="#00a000"
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(135 50 50)"
              />
              <path d="M20 50H25" stroke="#00a000" strokeWidth="2" />
              <path d="M75 50H80" stroke="#00a000" strokeWidth="2" />
              <path d="M50 20V25" stroke="#00a000" strokeWidth="2" />
              <path d="M50 75V80" stroke="#00a000" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-[montserratSemiBold] mb-3">Back window replacement</h3>
        </div>


                {/* Side view mirror replacement  */}
                <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-sky-500 mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="30" stroke="#00a000" strokeWidth="2" />
              <circle cx="50" cy="50" r="25" stroke="#00a000" strokeWidth="2" />
              <path
                d="M30 30L70 70"
                stroke="#00a000"
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(45 50 50)"
              />
              <path
                d="M30 30L70 70"
                stroke="#00a000"
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(135 50 50)"
              />
              <path d="M20 50H25" stroke="#00a000" strokeWidth="2" />
              <path d="M75 50H80" stroke="#00a000" strokeWidth="2" />
              <path d="M50 20V25" stroke="#00a000" strokeWidth="2" />
              <path d="M50 75V80" stroke="#00a000" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-[montserratSemiBold] mb-3">Side view mirror replacement </h3>
        </div>

                {/* All auto glass replacement */}
                <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
          <div className="text-sky-500 mb-4">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="30" stroke="#00a000" strokeWidth="2" />
              <circle cx="50" cy="50" r="25" stroke="#00a000" strokeWidth="2" />
              <path
                d="M30 30L70 70"
                stroke="#00a000"
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(45 50 50)"
              />
              <path
                d="M30 30L70 70"
                stroke="#00a000"
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(135 50 50)"
              />
              <path d="M20 50H25" stroke="#00a000" strokeWidth="2" />
              <path d="M75 50H80" stroke="#00a000" strokeWidth="2" />
              <path d="M50 20V25" stroke="#00a000" strokeWidth="2" />
              <path d="M50 75V80" stroke="#00a000" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-xl font-[montserratSemiBold] mb-3">All auto glass replacement</h3>
        </div>
      </div>
    </div>
    <div className="relative w-full">
      <div
        className="absolute w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-18%20171542-5tO2eRaXNA9jVI8J0XqG0hAPHQXqKR.png')",
        }}
      />
    </div>
    </>
  );
};

export default About;
