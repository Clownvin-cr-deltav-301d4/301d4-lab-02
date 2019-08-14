'use-strict';
/*
[
  {
    "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
    "title": "UniWhal",
    "description": "A unicorn and a narwhal nuzzling their horns",
    "keyword": "narwhal",
    "horns": 1
  },*/

class Image {
  constructor(imageJson) {
    this.url = imageJson.image_url;
    this.title = imageJson.title;
    this.description = imageJson.description;
    this.keyword = imageJson.keyword;
    this.horns = imageJson.horns;
    //Element
    this.element = $('<section class=\'image\'></section>');
    this.element.append(`<h3>${this.title}</h3>`);
    this.element.append(`<img id='${this.title}-image' src='${this.url}'></img>`);
    this.element.append(`<p class'description'>${this.description}</p>`);
  }

  getElement() {
    return this.element;
  }
}

$(document).ready(() => {
  const images = [];
  const main = $('main');
  $.get('./data/page-1.json', (data) => {
    // data = JSON.parse(data);
    for (const imageJson of data) {
      images.push(new Image(imageJson));
    }
    for (const image of images) {
      main.append(image.getElement());
    }
  });
  $("#keywords").change(event => {
    let keyword = $('#keywords').val();
    main.empty();
    for(const img of images){
      if (img.keyword === keyword){
        main.append(img.getElement());
      }
    }
  });
});

