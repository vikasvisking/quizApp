import React, { useState } from 'react';
import WelcomeScreen from '@/components/Welcome';
import Quiz from '@/components/Question';
import ResultsScreen from '@/components/Result';
import Leaderboard from '@/components/LeaderBoard';
import BackgroundImg from '@/assets/bg.jpg';
import BackgroundImg2 from '@/assets/bg2.jpg';
import AvatarImage from '@/assets/avatar.png';
import { Image } from 'antd';
import { getItem, setItem } from '@/utils';

const stages = {
  welcome: 'welcome',
  quiz: 'quiz',
  results: 'results',
  leaderboard: 'leaderboard'
}

const HomePage = () => {

  const [stage, setStage] = useState(getItem('stage') ?? stages.welcome);

  const startQuiz = () => {
    setItem('stage', stages.quiz)
    setStage(stages.quiz)
  };

  const setStageItem = (arg) => {
    setItem('stage', stages[arg])
    setStage(stages[arg])
  }

  const endQuiz = (score) => {
    const user = getItem('user')
    const results = getItem('results') ?? []
    setItem('results', [ ...results, {
      user: user,
      score: score,
      time: new Date().toISOString()
    }])
    setItem('stage', stages.results);
    setItem('currentScore', score)
    setStage(stages.results)
  };

  const restartQuiz = () => {
    setStage('welcome')
    setItem('stage', stages.welcome)
  };

  return (
    <div className='m-0 flex items-center justify-center overflow-hidden' style={{ background: `url(${BackgroundImg})`, height: '100vh' }}>
      <div className="w-[90%] mx-auto my-auto" style={{ background: `url(${BackgroundImg2})`, height: '90vh', backgroundSize: '100% 100%' }}>
        <div className='grid cols-span-5 lg:grid-cols-6 h-full'>
          <div className='col-span-1 py-8 pl-8 hidden lg:block'>
            <Image
              src={AvatarImage}
              className='my-auto'
            />
          </div>
          <div className='col-span-5'>
            {stage === stages.welcome && <WelcomeScreen startQuiz={startQuiz} setStageItem={setStageItem} />}
            {stage === stages.quiz && <Quiz endQuiz={endQuiz} />}
            {stage === stages.results && <ResultsScreen restartQuiz={restartQuiz} />}
            {stage === stages.leaderboard && <Leaderboard  setStageItem={setStageItem} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
