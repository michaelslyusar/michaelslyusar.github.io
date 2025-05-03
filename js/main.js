document.addEventListener('DOMContentLoaded', async () => {
  // Mobile menu
  const hamburgerButton = document.querySelector('.hamburger-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburgerButton.addEventListener('click', () =>
    mobileMenu.classList.toggle('active')
  );

  // Food menu
  const menu = await getJson();
  buildMenu(menu);

  // slider
  const progressBar = document.getElementById('progress-bar');
  calculateProgressBar(progressBar);

  document.addEventListener('click', (e) => {
    let handle;
    if (e.target.matches('.handle')) {
      handle = e.target;
    } else {
      handle = e.target.closest('.handle');
    }

    if (handle !== null) onHandleClick(handle);
  });
});

const getJson = async () => {
  try {
    const res = await fetch('../menu.json');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const buildMenu = (menu) => {
  const mainDiv = document.getElementById('main-menu');
  const slider = document.getElementById('slider2');

  menu.categories.forEach((category) => {
    // Populating the slider
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-text-container');
    slider.appendChild(imageContainer);
    // overlay
    const overlayTextDiv = document.createElement('div');
    overlayTextDiv.classList.add('overlay-text');
    imageContainer.appendChild(overlayTextDiv);

    const overlayText = document.createElement('a');
    overlayText.textContent = category.name;
    overlayText.href = '#' + category.name;
    overlayTextDiv.appendChild(overlayText);
    // Image
    const image = document.createElement('img');
    image.src = category.img;
    imageContainer.appendChild(image);

    const categorySection = document.createElement('section');

    const catNameDiv = document.createElement('div');
    catNameDiv.classList.add('category-name', 'text-center');
    catNameDiv.id = category.name;
    catNameDiv.textContent = category.name;
    categorySection.appendChild(catNameDiv);

    const categoryItems = document.createElement('div');
    categoryItems.classList.add('category-items');
    categorySection.appendChild(categoryItems);
    try {
      category.items.forEach((item) => {
        // Main div
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        categoryItems.appendChild(menuItem);

        //Line 1 div
        const firstLine = document.createElement('div');
        firstLine.classList.add('line-1');
        menuItem.appendChild(firstLine);
        //Line 2 div
        const secondLine = document.createElement('div');
        secondLine.classList.add('item-description', 'text-sm');
        secondLine.textContent = item.description;
        menuItem.appendChild(secondLine);

        //Line 1 - item size
        if (item.size) {
          const itemSize = document.createElement('div');
          itemSize.classList.add('item-size');
          itemSize.textContent = item.size;
          firstLine.appendChild(itemSize);
        }
        //Line 1 - item name
        const itemName = document.createElement('div');
        itemName.classList.add('item-name');
        itemName.textContent = item.name;
        firstLine.appendChild(itemName);
        if (item.price !== '') {
          // Dots container
          const dotContainer = document.createElement('div');
          dotContainer.classList.add('dot-container');
          firstLine.appendChild(dotContainer);

          // Dots Div
          const dotsDiv = document.createElement('div');
          dotsDiv.classList.add('dots');
          dotContainer.appendChild(dotsDiv);
          //Line 1 - item price
          const itemPrice = document.createElement('div');
          itemPrice.classList.add('item-price');
          itemPrice.textContent = '$' + item.price;
          firstLine.appendChild(itemPrice);
        }
      });
      // Populate the move to navbar
    } catch (err) {
      console.log(err);
    }

    mainDiv.appendChild(categorySection);
  });
};

// Carousel
//Move the carousel by a certain number of places.
const moveBy = (num) => {
  console.log('Move by', num);
  const slider = document.getElementById('slider2');

  const amountOfImages = slider.children.length;
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue('--items-per-screen')
  );
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue('--slider-index')
  );
  sliderIndex += num * (1 / itemsPerScreen);
  slider.style.setProperty('--slider-index', sliderIndex);
};

const onHandleClick = (handle) => {
  const progressBar = document.getElementById('progress-bar');
  console.log(progressBar);
  const slider = handle.closest('.slider2-row').querySelector('.slider2');

  let sliderIndex = parseFloat(
    getComputedStyle(slider).getPropertyValue('--slider-index')
  );

  const amountOfImages = slider.children.length;

  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue('--items-per-screen')
  );
  progressBar.children[Math.ceil(sliderIndex)].classList.remove('active');
  //   Last index start with 0
  const lastIndex = Math.ceil(amountOfImages / itemsPerScreen) - 1;
  if (handle.classList.contains('left-handle')) {
    if (sliderIndex === 0) {
      const step = 1 / itemsPerScreen;
      const lastStep = (amountOfImages - itemsPerScreen) * step;

      progressBar.lastChild.classList.add('active');
      slider.style.setProperty('--slider-index', lastStep);
    } else if (sliderIndex !== 1 && Math.ceil(sliderIndex) === 1) {
      slider.style.setProperty('--slider-index', 0);
      progressBar.children[0].classList.add('active');
    } else {
      console.log('Index is equal: ', sliderIndex);
      sliderIndex -= 1;
      progressBar.children[Math.ceil(sliderIndex)].classList.add('active');
      slider.style.setProperty('--slider-index', sliderIndex);
    }

    // Right button
  } else if (handle.classList.contains('right-handle')) {
    if (sliderIndex == lastIndex - 1) {
      const itemsLeft = amountOfImages - [itemsPerScreen * lastIndex];
      moveBy(itemsLeft);
      progressBar.lastChild.classList.add('active');
    } else if (Math.ceil(sliderIndex) == lastIndex) {
      progressBar.children[0].classList.add('active');
      slider.style.setProperty('--slider-index', 0);
    } else {
      sliderIndex += 1;
      progressBar.children[sliderIndex].classList.add('active');
      slider.style.setProperty('--slider-index', sliderIndex);
    }
  }
};

const calculateProgressBar = (progressBar) => {
  const slider = progressBar.closest('.slider2-row').querySelector('.slider2');
  const itemCount = slider.children.length;

  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue('--items-per-screen')
  );

  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue('--slider-index')
  );

  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);
  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement('div');
    barItem.classList.add('progress-item');

    if (i === sliderIndex) {
      barItem.classList.add('active');
    }
    progressBar.appendChild(barItem);
  }
};
