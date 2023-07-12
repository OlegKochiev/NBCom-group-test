import React from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import leftArrow from './../../../public/icons/left_icon.svg';

export default function GoBackButton() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <button type="button" onClick={handleClick}>
      <Image src={leftArrow} alt="" width={30} height={30} />
    </button>
  );
}
