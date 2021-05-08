import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import FundCardView from "../../components/FundCardView";

function calculateFundraisingProgress(current, goal) {
  try {
    return `${(current / goal) * 100}%`;
  } catch (error) {
    return "0%";
  }
}

function findKey(posts, key) {
  const list = [];
  if (!posts) {
    for (var i = 0; i < posts.length; i++) {
      var obj = posts[i];
      if (obj.category === key) {
        list.push(obj);
      }
    }
  }
  console.log(`For category: ${key}, we have the list:`);
  return list;
}

const PaginationComponent = ({ fundCardItems }) => {
  console.log(fundCardItems);
  const [pageNumber, setPageNumber] = useState(0);
  //items shown per page
  const fundCardPerPage = 9;
  /**
   * We need the info- How many items we got in a single page. Suppose,
   * total items= 30. We want to show 10 items per page.
   * So on the 3rd page there will be 30th item,
   * So it's index will be 3*10=30
   */
  const pagesVisited = pageNumber * fundCardPerPage;
  //contains total no of pages
  const pageCount = Math.ceil(fundCardItems.length / fundCardPerPage);

  console.log("fund card items: ", fundCardItems);

  const displayFundCardItem = fundCardItems
    .slice(pagesVisited, pagesVisited + fundCardPerPage)
    .map((fundCard) => {
      return (
        <div className="col-lg-3 col-md-4 col-6" key={fundCard._id}>
          <FundCardView
            imgURL={fundCard.coverPhoto}
            title={fundCard.title}
            desc={fundCard.story}
            currentProgress={calculateFundraisingProgress(
              fundCard.fundraisedTotal,
              fundCard.fundraisingGoal
            )}
            currentAmountRaised={fundCard.fundraisedTotal}
            goal={fundCard.fundraisingGoal}
          />
        </div>
      );
    });

  /**
   * The method to call when a page is clicked.
   * Exposes the current page object as an argument.
   * */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row row-flex">{displayFundCardItem}</div>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"ui pagination pointing secondary menu"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        marginPagesDisplayed={0}
        // pageRangeDisplayed={3}
      />
    </div>
  );
};

export default PaginationComponent;
