import React from 'react';
import Head from 'next/head';
import Login1 from './components/login/login';
import FormAlert from './components/common/alert';
export default function Home() {

    return (
        <div>
            <Head>
               
                <title>Customer Support</title>
            </Head>

            <Login1 />
            <FormAlert  />
        </div>
    )
}
