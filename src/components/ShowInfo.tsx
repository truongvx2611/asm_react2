import React from 'react'

type ShowInfoProps = {
    name: string,
    age: number
}

const ShowInfo = ({name,age}: ShowInfoProps) => {

  return (
    <div>Hi {name}, {age} tuổi</div>
  )
}

export default ShowInfo