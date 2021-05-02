import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import FundCardView from "../../components/FundCardView";

const PaginationComponent = () => {
  //storing each item
  const [fundCardItems, setFundCardItems] = useState([]);
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

  //Fetching data from JSON or API
  useEffect(() => {
    fetch("./fund_card.json")
      .then((response) => response.json())
      .then((json) => setFundCardItems(json));
  }, []);

  //component for rendering/mapping each item
  const displayFundCardItem = fundCardItems
    .slice(pagesVisited, pagesVisited + fundCardPerPage)
    .map((fundCard) => {
      return (
        <div className="col-lg-3 col-md-4 col-6" key={fundCard.id}>
          <FundCardView
            imgURL={fundCard.imgURL}
            title={fundCard.title}
            desc={fundCard.desc}
            currentProgress={fundCard.currentProgress}
            currentAmountRaised={fundCard.currentAmountRaised}
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
