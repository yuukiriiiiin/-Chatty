import React, { useState } from 'react'

enum Genre {'中華', '洋食'}
type MenuList = {
    genre: Genre
    menu: string[];
}

type Props = {
  addData: (genre: string, menu: string) => void;
}
export const ShufflePage: React.FC<Props> = ({addData}) => {
  const menuList = ['ナスの炒め物', 'カレー（トマト）', 'ハヤシライス', '豚の生姜焼き', 'もやし（海の精（塩）を添えて）と味噌汁']
  const maxLength = menuList.length - 1;
  const speed = 20;

  const [menu, setMenu] = useState<string>('選ぶ')
  const [isStart, setIsStart] = useState<boolean>(false)
  const [randStart, setRandStart] = useState<number>(0)

  const startShuffle = () => {
    console.log('スタート')
    setIsStart(true)

    let key = 0;

    const randShuffle = () => {
      if (key > maxLength) key = 0;
      setMenu(menuList[key]);
      key++;
    }

    setRandStart(window.setInterval(randShuffle, speed));
  }

  const stopShuffle = () => {
    console.log('ストップ')
    setIsStart(false)

    const random = Math.floor(Math.random() * (maxLength + 1));
    setMenu(menuList[random]);

    window.clearInterval(randStart);
  }

  const handleAddData = () => {
    addData('中華', menu)
  }

  return (
    <div>
      <div>
        <p>{menu}</p>
        <button type="button" onClick={isStart ? stopShuffle : startShuffle}>{isStart ? 'ストップ' : 'スタート'}</button>
        <button type="button" onClick={handleAddData}>これに決めた！</button>
      </div>
    </div>
  )
}