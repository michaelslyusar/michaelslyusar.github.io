document.addEventListener('DOMContentLoaded', async () => {
  const menu = await getJson();
  const inputs = document.querySelectorAll('input');
  const categoryContainer = document.getElementById('dashboard-container');
  accordionFunctionality(categoryContainer);

  validateInputs(inputs);
  renderDashboard(menu);

  // Modal functionality
  const openBtn = document.getElementById('open-btn');
  const closeBtn = document.getElementById('close-btn');

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
});

const accordionFunctionality = (dashboard) => {
  dashboard.addEventListener('click', (e) => {
    const groupHeader = e.target.closest('.dashboard-group-header');
    if (!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector('.dashboard-group-body');
    const icon = groupHeader.querySelector('i');

    //Toggle icon
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');

    // Toggle visibility of body
    groupBody.classList.toggle('open');

    //Close other open dashboard bodies
    const otherGroups = dashboard.querySelectorAll('.dashboard-group');

    otherGroups.forEach((otherGroup) => {
      if (otherGroup !== group) {
        const otherGroupBody = otherGroup.querySelector(
          '.dashboard-group-body'
        );
        const otherIcon = otherGroup.querySelector('.dashboard-group-header i');

        otherGroupBody.classList.remove('open');
        otherIcon.classList.remove('fa-minus');
        otherIcon.classList.add('fa-plus');
      }
    });
  });
};

const validateInputs = (inputs) => {
  inputs.forEach((el) => {
    el.addEventListener('blur', (e) => {
      if (e.target.value) {
        e.target.classList.add('not-empty');
      } else {
        e.target.classList.remove('not-empty');
      }
    });
  });
};
const getJson = async () => {
  try {
    const res = await fetch('../menu.json');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

{
  /* <table class="table-1" id="table-1">
    <tr>
        <th>Category</th>
        <th>Dish</th>
        <th>Price</th>
    </tr>
    <tr>
        <td data-cell="category">bev</td>
        <td data-cell="dish">1</td>
        <td data-cell="price">2</td>
    </tr>
    <tr>
        <td>get</td>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>gtr</td>
        <td>1</td>
        <td>3</td>
    </tr>

</table> */
}

const renderDashboard = (menu) => {
  menu.categories.forEach((category) => {
    // console.log(category);
    const dashboard = document.getElementById('dashboard');
    const dashboardDiv = document.createElement('div');
    dashboardDiv.classList.add('dashboard-group');
    dashboard.appendChild(dashboardDiv);

    // Header
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('dashboard-group-header');
    dashboardDiv.appendChild(headerDiv);

    // Header components
    const headerComponent1 = document.createElement('h4');
    headerComponent1.classList.add('text-md');
    headerComponent1.textContent = category.name;
    headerDiv.appendChild(headerComponent1);

    const headerComponent2 = document.createElement('i');
    headerComponent2.classList.add('fas', 'fa-plus');
    headerDiv.appendChild(headerComponent2);

    // Body
    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('dashboard-group-body');
    dashboardDiv.appendChild(bodyDiv);

    // Menu Table
    const categoryTable = document.createElement('table');
    categoryTable.classList.add('table');
    bodyDiv.appendChild(categoryTable);

    

    // Main Content
    if (category.items) {
      // Headers
      const categoryHeaders = document.createElement('tr');
      categoryTable.appendChild(categoryHeaders);

      const categoryHeaderName = document.createElement('th');
      categoryHeaderName.textContent = 'Name';
      const categoryHeaderSize = document.createElement('th');
      categoryHeaderSize.textContent = 'Size';
      const categoryHeaderPrice = document.createElement('th');
      categoryHeaderPrice.textContent = 'Price';
      const categoryHeaderDescription = document.createElement('th');
      categoryHeaderDescription.textContent = 'Description';

      categoryHeaders.appendChild(categoryHeaderName);
      categoryHeaders.appendChild(categoryHeaderSize);
      categoryHeaders.appendChild(categoryHeaderPrice);
      categoryHeaders.appendChild(categoryHeaderDescription);
      category.items.forEach((item) => {
        const row = document.createElement('tr');
        categoryTable.appendChild(row);

        const categoryDataName = document.createElement('td');
        categoryDataName.textContent = item.name;
        const categoryDataSize = document.createElement('td');
        categoryDataSize.textContent = item.size;
        const categoryDataPrice = document.createElement('td');
        categoryDataPrice.textContent = item.price;
        const categoryDataDescription = document.createElement('td');
        categoryDataDescription.textContent = item.description;

        row.appendChild(categoryDataName);
        row.appendChild(categoryDataSize);
        row.appendChild(categoryDataPrice);
        row.appendChild(categoryDataDescription);
      });
    }
  });
};

const openModal = () => {
  const m1 = document.getElementById('modal-1');
  m1.classList.add('open');
};

const closeModal = () => {
  const m1 = document.getElementById('modal-1');
  m1.classList.remove('open');
};
