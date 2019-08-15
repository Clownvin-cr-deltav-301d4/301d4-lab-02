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
      console.log(this.element.children('img'));
      this.element.children('img').click(() => {
        console.log('clicked');
        modal.css('display', 'block');
        modalImg.attr('src', this.url);
        modalCaption.text(this.description);
      });
    }

    getElement() {
      return this.element;
    }
  }

  const images = [];
  const main = $('main');
  const keywordDropdown = $('#keywords');
  const sortDropdown = $('#sort');
  //Modal stuff
  const modal = $('#modal');
  const modalImg = $('#modal-img');
  const modalCaption = $('#modal-caption');

  const imageTemplateSource = $('#image-template').html();
  const imageTemplate = Handlebars.compile(imageTemplateSource);

  function redraw(){
    let keyword = keywordDropdown.val();
    let searchterm = $('#searchbar').val().toLowerCase();
    main.empty();
    for (const img of images) {
      if (!img.keyword.toLowerCase().includes(searchterm) && !img.title.toLowerCase().includes(searchterm)) {
        continue;
      }
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

  $('#searchbar').on('input', () => redraw());

  $('#close').click(() => {
    modal.css('display', 'none');
  })
});

