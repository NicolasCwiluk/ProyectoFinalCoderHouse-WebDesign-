function getFilename(path) {
  return path.split("/").pop().split(".")[0];
}

function getCarouselIndicator(src) {
  let index = $("#carouselGallery .carousel-indicator").length;
  return (
    '<button type="button" id="' +
    getFilename(src) +
    'Indicator" class="carousel-indicator" data-bs-target="#carouselGallery" data-bs-slide-to="' +
    index +
    '" aria-label="Slide ' +
    index +
    '"></button>'
  );
}

function getCarouselItem(src) {
  return (
    '<div id="' +
    getFilename(src) +
    'Item" class="carousel-item justify-content-center">CAROUSEL_ITEM</div>'
  );
}

function getCarouselImg(src, alt, title) {
  return getCarouselItem(src).replace(
    "CAROUSEL_ITEM",
    '<img class="d-block w-100" src="' +
      src +
      '" alt="' +
      alt +
      '"/>' +
      getCarouselCaption(title)
  );
}

function getCarouselCaption(title) {
  return title !== undefined
    ? '<div class="carousel-caption"><p class="image-text">' +
        title +
        "</p></div>"
    : "";
}

function openGallery(elem) {
  $("#carouselGallery .carousel-indicator").removeClass("active");
  $("#carouselGallery .carousel-item").removeClass("active");

  if (!elem) {
    elem = $("#gallery img")[0];
  }

  let filename = getFilename($(elem).attr("src"));

  $("#" + filename + "Indicator").addClass("active");
  $("#" + filename + "Item").addClass("active");

  $("#galleryModal").modal("show");
}

function initGallery() {
  $("#gallery .gallery-photo").click(function () {
    openGallery($(this).children());
  });

  $("#gallery img").each(function () {
    $("#carouselGallery .carousel-indicators").append(
      getCarouselIndicator($(this).attr("src"))
    );
    $("#carouselGallery .carousel-inner").append(
      getCarouselImg(
        $(this).attr("src"),
        $(this).attr("alt"),
        $(this).parent().attr("title")
      )
    );
  });
}

$(document).ready(function () {
  initGallery();
});
