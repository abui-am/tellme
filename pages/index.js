import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
import firebase from '../firebase/clientApp';

export default function Home() {
  return (
    <div className='container'>
      <div className=' w-full max-w-lg'>Test</div>
    </div>
  );
}
