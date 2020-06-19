import React, { useEffect, useState } from 'react'
import ReactPaginationComponent from 'reactjs-pagination-component'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=javascript&hitsPerPage=5&page=${currentPage}`
      )
      const data = await response.json()

      setData(data.hits)
      setTotalPages(data.nbPages)
      setIsLoading(false)
    }

    fetchData()
  }, [currentPage])

  const handleChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const listNode = () => {
    return (
      <ul>
        {data.map((datum, index) => {
          return <li key={index}>{datum.title}</li>
        })}
      </ul>
    )
  }

  const paginationNode = () => {
    if (isLoading) {
      return false
    }

    return (
      <div className='pagination-component'>
        <ReactPaginationComponent
          color='#333'
          isLoading={isLoading}
          onChange={handleChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    )
  }

  return (
    <div className='container'>
      {listNode()}
      {paginationNode()}
    </div>
  )
}

export default App
