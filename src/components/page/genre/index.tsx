import Link from 'next/link'
import React from 'react'

export const GenrePage = () => {
  const category = ['全て', '中華', '和食', '韓国', '洋食']
  return (
    <ul>
      {category.map(c => (
        <li><Link href="/shuffle"><a>{c}</a></Link></li>
      ))}
    </ul>
  )
}