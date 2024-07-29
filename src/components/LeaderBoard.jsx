import React from 'react';
import { getItem } from '@/utils';
import { Button, Table } from 'antd';

const Leaderboard = ({ setStageItem }) => {
  const scores = getItem('results') ?? []

  const columns = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'name',
      render: (data) => <span className='text-lg font-semibold capitalize'>{data.name}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'user',
      key: 'age',
      render: (data) => data.age,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (data) => <span className=' font-semibold capitalize'>{data} / 10</span>,
    },
    {
      title: 'Date',
      dataIndex: 'time',
      key: 'time',
      render: (data) => <span className=' font-semibold capitalize'>{new Date(data).toLocaleDateString()}</span>,
    },
  ]

  console.log(scores)

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className=' rounded-lg bg-slate-100/75 lg:w-2/3 lg:p-10 p-4'>
      <Button className='mb-8 px-4' size='small' onClick={() => setStageItem('welcome')}>
        Back
      </Button>
        <h1 className='font-bold text-[40px] text-[#004AA7] mb-8'>Leader board</h1>
        <Table columns={columns} dataSource={scores} />
      </div>
    </div>
  )
};

export default Leaderboard;
