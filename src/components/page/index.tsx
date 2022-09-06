import react, { useState } from 'react'

export const Page = () => {
  const menuList = ['ナスの炒め物', 'カレー（トマト）', 'ハヤシライス', '豚の生姜焼き', 'もやし（海の精（塩）を添えて）と味噌汁']
  const maxLength = menuList.length - 1;
  const speed = 20;

  const [menu, setMenu] = useState<string>(menuList[0])
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
    console.log('L27: ' + randStart)
  }

  const stopShuffle = () => {
    console.log('ストップ')
    console.log('L32: ' + randStart)
    setIsStart(false)

    const random = Math.floor(Math.random() * (maxLength + 1));
    setMenu(menuList[random]);
    window.clearInterval(randStart);
  }

  return (
    <div>
      <p>{menu}</p>
      <button type="button" onClick={isStart ? stopShuffle : startShuffle}>{isStart ? 'ストップ' : 'スタート'}</button>
    </div>
  )
}