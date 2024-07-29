import React, { useMemo, useState } from 'react';
import { Button, Input, Form, InputNumber } from 'antd';
import { setItem } from '@/utils'
import { DashboardOutlined, LogoutOutlined } from '@ant-design/icons';

const Welcome = ({ startQuiz, setStageItem }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleStartQuiz = () => {
    if (name && age) {
      const payload = { name, age }
      setItem('user', payload)
      startQuiz();
    }
  };

  const formValid = useMemo(() => !!name && !!age, [name, age])

  return (
    <div className="flex flex-col items-start justify-center h-full px-4 lg:px-10 lg:ml-10">
      <h1 className="lg:text-[80px] font-bold text-white text-4xl">Welcome to Quiz</h1>
      <p className="text-base my-8">Test your knowledge about countries, languages, and continents!</p>
      <Form className="lg:w-1/2" layout={'vertical'}>
        <Form.Item
          label="Enter your full name"
          rules={[{ required: true, message: 'Please enter your full name!' }]}
        >
          <Input value={name} onChange={(e) => { setName(e.target.value) }} className="lg:p-2 lg:text-lg" maxLength={'80'}  />
        </Form.Item>
        <Form.Item
          label="Enter your age"
          rules={[{ required: true, message: 'Please enter your age!' }]}
        >
          <InputNumber value={age} onChange={(value) => { setAge(value) }} className="lg:p-2 lg:text-lg" max='80'  />
        </Form.Item>
       <div className='flex lg:items-center justify-between flex-col lg:flex-row gap-8'>
       <Button icon={<LogoutOutlined />} className='shadow-lg font-bold lg:text-xl lg:w-2/5 p-4 lg:p-8 border-2 border-white bg-[#006ed2] text-white' onClick={handleStartQuiz} disabled={!formValid}>Start Quick</Button>
       <Button icon={<DashboardOutlined />} className='shadow-lg font-bold lg:text-xl lg:w-2/5 p-4 lg:p-8 bg-white text-[#006ed2]' onClick={() => setStageItem('leaderboard')}>Leaderboard</Button>
       </div>
      </Form>
    </div>
  );
};


export default Welcome;
