import { Box, Button, Input } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import PlugList from '../features/plugs/PlugList'
import { MockPlugListings } from '../features/plugs/utils/constants'
import { FiMapPin } from 'react-icons/fi';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Plug.no</title>
        <meta name="description" content="Find a plug." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box mb={20}>
          <Box sx={{ display: 'flex', gap: 10, justifyContent: 'flex-start', alignItems: 'center'}}>
            <Input variant="filled" placeholder="Where are you?" icon={<FiMapPin size={22} />} size="lg" sx={{ flexGrow: 1 }} />
            <Button 
              size='lg'
              color="indigo"
            >
              Find a plug
            </Button>
          </Box>
        </Box>

        <PlugList plugs={MockPlugListings} />
      </main>
    </div>
  )
}

export default Home
