// src/components/ResultsScreen.js
import React from 'react';
import { Button } from 'antd';
import { getItem } from '@/utils'

const ResultsScreen = ({ restartQuiz }) => {
  const score = getItem('currentScore')
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='text-center rounded-lg bg-slate-100/75 lg:w-2/3 lg:p-10 p-4'>
        <h1 className='font-bold text-[80px] text-[#004AA7]'>THANK YOU</h1>
        <h1 className='font-bold text-2xl text-[40px] mb-10'>FOR YOUR TIME</h1>
        <span className='font-bold text-[24px] mr-4'> YOUR SCORE IS </span>
        <h1 className='font-bold text-[80px] text-[#004AA7] flex items-center justify-center mb-10'>{score} / 10</h1>
        <Button type="primary" onClick={restartQuiz} className='p-8 w-1/2 text-2xl font-bold'>Restart Quiz</Button>
      </div>
    </div>
  )
};

export default ResultsScreen;
