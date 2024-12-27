import "./styles.css";
import Page from "./components/Page.jsx";
import { useState } from "react";

export default function App() {
  const [ppage, setPpage] = useState(1);
  const [pages, setPages] = useState([
    { pageN: 1, isActive: true },
    { pageN: 2, isActive: false },
    { pageN: 3, isActive: false },
    { pageN: 4, isActive: false },
    { pageN: 5, isActive: false },
    { pageN: 6, isActive: false },
    { pageN: 7, isActive: false },
  ]);

  function handleClick(event, ele, buttonType) {
    event.preventDefault();

    pages[ppage - 1].isActive = false;
    setPages([...pages]);

    var nextPage;
    if (buttonType === "Next") {
      nextPage = ppage + 1;
    } else if (buttonType === "Prev") {
      nextPage = ppage - 1;
    } else {
      nextPage = ele.pageN;
    }

    setPpage(nextPage);
    var newPage = pages.map((page) => {
      return page.pageN === nextPage ? { ...page, isActive: true } : page;
    });

    setPages([...newPage]);
  }
  return (
    <div className="App">
      {pages.map((page) => {
        if (page.isActive) {
          return <Page number={page.pageN} />;
        }
      })}
      <button
        style={{ display: "inline", padding: "3px" }}
        onClick={(event) => handleClick(event, null, "Prev")}
        disabled={ppage === 1 ? true : false}
      >
        Prev
      </button>
      {ppage > 5 && <button>..</button>}
      {pages.map((page) => {
        return (
          page.pageN >= ppage - 5 + 1 &&
          (page.pageN <= 5 || page.pageN <= ppage) && (
            <button
              onClick={(event) => handleClick(event, page, null)}
              style={{
                display: "inline",
                padding: "3px",
                color: page.isActive ? "blue" : "black",
              }}
            >
              {page.pageN}
            </button>
          )
        );
      })}
      {ppage !== pages.length && <button>..</button>}
      <button
        style={{ display: "inline", padding: "3px" }}
        onClick={(event) => handleClick(event, null, "Next")}
        disabled={ppage === pages.length ? true : false}
      >
        Next
      </button>
    </div>
  );
}
