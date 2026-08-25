import type { NextPage } from 'next';
import Head from 'next/head';

import Scene from '@components/Scene';
import { Canvas } from '@react-three/fiber';
import Toolbar from '@src/components/Toolbar';
import ExportButton from '@src/components/ExportButton';
import ImportButton from '@src/components/ImportButton';
import Lab from '@src/components/Lab';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Voxel Landscaping</title>
        <meta name="description" content="DK30 fall 2021" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen">
        <Canvas shadows>
          <Scene />
        </Canvas>
        <Toolbar />

        <Lab>
          LMB: Add block,
          RMB: Remove block,
          SCROLL: Zoom
        </Lab>
      </main>
    </>
  );
};

export default Home;
