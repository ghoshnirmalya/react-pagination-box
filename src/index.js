/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const ReactPaginationComponent = ({
  onChange,
  currentPage,
  totalPages,
  color,
  isLoading
}) => {
  // The logic for generating pagination is taken from
  // https://gist.github.com/kottenator/9d936eb3e4e3c3e02598

  const pageBuffer = 3
  const startPage = currentPage - pageBuffer
  const endPage = currentPage + pageBuffer + 1
  const range = []
  const rangeWithDots = []
  let l

  for (let i = 1; i <= totalPages; i++) {
    if (i == 1 || i == totalPages || (i >= startPage && i < endPage)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === pageBuffer) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)

    l = i
  }

  if (isLoading) {
    return false
  }

  return (
    <ul
      css={css`
        list-style-type: none;
        padding: 0;
        display: flex;
      `}
    >
      {rangeWithDots.map((pageNumber, index) => {
        return (
          <li
            key={index}
            css={css`
              :not(:last-child) {
                margin-right: 10px;
              }
            `}
          >
            <button
              data-page-number={pageNumber}
              onClick={() => onChange(pageNumber)}
              disabled={pageNumber === '...'}
              css={css`
                border: 1px solid ${color};
                border-radius: 2px;
                color: ${currentPage === pageNumber ? '#fff' : color};
                padding: 5px 10px;
                background-color: ${currentPage === pageNumber
                  ? color
                  : 'transparent'};
                font-size: inherit;

                :hover {
                  cursor: pointer;
                }

                :disabled {
                  border: none;
                  cursor: not-allowed;
                }
              `}
            >
              {pageNumber}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ReactPaginationComponent
