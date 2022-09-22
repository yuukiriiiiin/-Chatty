import Link from 'next/link'
import React from 'react'

export const GenrePage = () => {
  const category = ['全て', '中華', '和食', '韓国', '洋食']
  return (
    <select>
      {category.map((c, i) => (
        <option key={i}>{c}</option>
      ))}
    </select>
  )
}

