import React from 'react';
import { Button, Spin } from 'antd';
import useQuestions from '@/hooks/useQuestions'
import { ArrowRightOutlined, ArrowLeftOutlined, LoginOutlined } from '@ant-design/icons';

const Questions = ({ endQuiz }) => {

  const { loading, error, questions, getCurrentQuestion, currentQuestion, handleNext, handlePrevious, handleAnswerClick, getCurrentAnswer, calculateScore, getElaspedTime } = useQuestions()

  if (loading) return <Spin size='large' fullscreen />;
  if (error) return <p>Error :(</p>;

  const handleFinish = () => {
    const score = calculateScore()
    endQuiz(score)
  }

  return (
    <div className='w-4/5 mx-auto pt-4 pb-8 flex items-center justify-center h-full mb-8 -mt-4'>
      <div>
      <div className='text-left font-bold text-lg text-white mb-6 flex lg:items-center gap-6 justify-between flex-col lg:flex-row'>
        <span>
          Question { currentQuestion + 1 } / { questions.length}
        </span>
        <span className='lg:mr-10'>
          Time spent: {getElaspedTime} 
        </span>
      </div>
        {
          getCurrentQuestion ? <>
            <h2 className='font-bold lg:text-6xl text-4xl text-white mb-6 lg:leading-relaxed'> {getCurrentQuestion.question} </h2>
            <div className=' flex items-start flex-col lg:w-2/3'>
              {
                getCurrentQuestion.options.map((item, index) => (
                  <Button key={item + index} className={`w-4/5 p-6 my-2 border-2 border-white bg-[#006ed2] text-white font-bold text-lg transition transform duration-500 hover:scale-125 animate-bounceIn ${getCurrentAnswer === item ? 'scale-125 bg-white text-[#006ed2]' : ''}`} onClick={() => handleAnswerClick(item)}>
                    {item}
                  </Button>
                ))
              }
              <div className='flex items-center justify-between py-8 grow w-full flex-col-reverse lg:flex-row gap-4'>
                {
                  currentQuestion !== 0 ? <Button icon={<ArrowLeftOutlined />} iconPosition='start' onClick={handlePrevious} className='w-48 font-bold' size='large' >Previous</Button> : ''
                }
                
                {
                  currentQuestion === 9 ? <Button onClick={handleFinish} className='w-48 font-bold' size='large' disabled={!getCurrentAnswer}  icon={<LoginOutlined />} iconPosition='end'>Finish</Button> : <Button onClick={handleNext} className='w-48 font-bold' size='large' disabled={!getCurrentAnswer}  icon={<ArrowRightOutlined />} iconPosition='end'>Next</Button>
                }
              </div>
            </div>
          </> : ''
        }
      </div>

    </div>
  );
};

export default Questions;
