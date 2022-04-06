import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="mx-auto max-w-7xl flex min-h-screen flex-col py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
        <h1 className="w-52 cursor-pointer text-2xl mb-10 font-extralight sm:w-80">
          The{' '}
          <span className="font-extrabold text-zinc-900 underline decoration-pink-600/50">
            {' '}
            Blingz
          </span>{' '}
          NFT Market Place
        </h1>

        <main className=" bg-slate-100 p-10 shadow-xl shadow-rose-400/20 lg:px-10 2xl:px-48">
          <div className="mt-4 flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {collections.map((collection, idx) => (
              <Link key={idx} href={`/nft/${collection.slug.current}`}>
                <div className="group relative cursor-pointer transition duration-500 ease-in-out hover:rotate-1 hover:scale-105">
                  <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-red-800 opacity-30 blur transition duration-1000 group-hover:opacity-80"></div>
                  <div className="relative mx-auto items-center justify-between rounded-xl bg-white object-cover p-2 leading-none transition duration-200 hover:text-red-900 dark:bg-slate-300 dark:hover:text-red-500">
                    <img
                      className="lg:w-38 h-auto flex-shrink rounded-2xl object-cover sm:w-full"
                      src={urlFor(collection.previewImage).url()}
                      alt=""
                    />
                    <div className="text-overflow overflow-hidden p-2 text-center text-2xl">
                      {collection.title}
                      <p className="text-overflow items-center overflow-hidden text-center text-sm ">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
      _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage {
        asset
      },
      previewImage {
         asset
      },
      slug {
        current
      },
      creator-> {
        _id,
        name,
        address,
        slug {
        current
      },
    },
  }`

  const collections = await sanityClient.fetch(query)
  return {
    props: {
      collections,
    },
  }
}
