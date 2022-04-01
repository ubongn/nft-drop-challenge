import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-1'>
        <h2 className="text-4xl font-bold text-red-500">
          Welcome to the NFT Drop Challenge
        </h2>
       <button className='h-10 bg-red-600 text-white w-full font-bold rounded-full mt-6'>Click Here</button>
      </div>
      <div>
      <img src="/nft2.png" alt="" />
      </div>
    </div>
  )
}

export default Home
