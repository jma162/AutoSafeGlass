import React from 'react'
import Banner from './components/Banner'
import Repair from './components/Repair'
import HowItWorks from './components/HowItWorks'
import Partners from './components/Partners'

const page = () => {
  return (
    <main className="flex flex-col">
      <Banner />
      <div className="-mt-16 relative z-10">
        <Repair />
      </div>
      <div className="-mt-8">
        <HowItWorks />
      </div>
      <div className="-mt-8">
        <Partners />
      </div>
    </main>
  )
}

export default page