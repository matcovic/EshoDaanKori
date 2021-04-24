import React, { useEffect, useState } from "react";
import "../PaginationComponent/pagination.css";
import { Pagination } from "semantic-ui-react";

const renderData = (data) => {
  return (
    <ul>
      {data.map((fundCard, index) => {
        return (
          <li key={index}>
            <h2>{fundCard.title}</h2>
          </li>
        );
      })}
    </ul>
  );
};

const PaginationComponent = () => {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); //store current page number
  const [itemsPerPage, setItemsPerPage] = useState([2]); //display 2 items per page

  //for limiting page numbers from a long list
  const [pageNumberLimit, setPageNumberLimit] = useState(3); // diplay total 3 page numbers
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3); // display max 3 page numbers
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0); //display min 0 page numbers

  const handleClick = (event) => {
    //setting current page with a id of a
    //particular target which is a page number
    setCurrentPage(Number(event.target.id));
  };

  const pages = []; //contains total no of pages
  for (let i = 1; i < Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  //We need the info- How many items we got in a single page
  const indexOfLastItem = currentPage * itemsPerPage;
  /**
   * Suppose, total items= 30
   * We want to show 10 items per page.
   * So on the 3rd page there will be 30th item,
   * So it's index will be 3*10=30
   */

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  //component for rendering page numbers
  //mapping pages array which is providing number for each page(1,2,3, ...)

  const renderPageNumbers = pages.map((number) => {
    //condition for limitation and showing page numbers in a page
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        //displaying page number in list manner
        //handleClick() method for each no of page
        /**
         * Adding active class for a active page number,
         * if current page = pageNumber
         *     then add acive class
         * else
         *     do nothing
         */
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  //Fetching data from JSON or API
  useEffect(() => {
    fetch("./fund_card.json")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  //showing dots. Means more pages available on next
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>;
  }
  //showing dots. Means more pages available on previous
  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>;
  }

  return (
    <>
      <h1>FUCK</h1> <br />
      {renderData(currentItems)}
      <Pagination
        boundaryRange={0}
        defaultActivePage={1}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        totalPages={8}
        onPageChange
        // ellipsisItem={null}
      />
    </>
  );
};

export default PaginationComponent;
