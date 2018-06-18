$( document ).ready(() => {

  $(document).on("click", "#scrapeButton", (event) => {
    event.preventDefault();
    $.get("/api/scrape").then(() => {
      
    });
  });

});