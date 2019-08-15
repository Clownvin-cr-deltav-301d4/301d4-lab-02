'use-strict';

$(document).ready(() => {
  class Image {
    constructor(imageJson) {
      this.url = imageJson.image_url;
      this.title = imageJson.title;
      this.description = imageJson.description;
      this.keyword = imageJson.keyword;
      this.horns = imageJson.horns;
      //Element
      this.element = $(imageTemplate(this));
    }

    getElement() {
      return this.element;
    }
  }

  const images = [];
  const main = $('main');
  const keywordDropdown = $('#keywords');
  const sortDropdown = $('#sort');

  const imageTemplateSource = $('#image-template').html();
  const imageTemplate = Handlebars.compile(imageTemplateSource);

  function redraw(){
    let keyword = keywordDropdown.val();
    main.empty();
    for (const img of images) {
      if (keyword !== 'default' && img.keyword === keyword){
        main.append(img.getElement());
      } else if (keyword === 'default') {
        main.append(img.getElement());
      }
    }
  }
  
  $.get(galleryPage, data => {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    const keywords = [];
    for (const imageJson of data) {
      if (!keywords.includes(imageJson.keyword)) {
        keywords.push(imageJson.keyword);
      }
      images.push(new Image(imageJson));
    }
    for (const keyword of keywords) {
      keywordDropdown.append($(`<option value='${keyword}'>${keyword.charAt(0).toUpperCase() + keyword.slice(1)}</option>`));
    }
    redraw();
  });

  keywordDropdown.change(redraw);

  sortDropdown.change(() => {
    let sortby = sortDropdown.val();
    if(sortby === 'horns'){
      images.sort((a, b) => a.horns - b.horns);
    } else if (sortby === 'title'){
      images.sort((a, b) => a.title.localeCompare(b.title));
    }
    redraw();
  });
});

