const form = document.getElementById('guest-form');
const guestList = document.getElementById('guest-list');
const guestNameInput = document.getElementById('guest-name');
const guestCategory = document.getElementById('guest-category');

let guests = [];

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = guestNameInput.value.trim();
  const category = guestCategory.value;

  if (!name) return;

  if (guests.length >= 10) {
    alert('Guest list is full (10 people max).');
    return;
  }

  const guest = {
    id: Date.now(),
    name,
    category,
    attending: false,
    time: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  renderGuests();

  form.reset();
});

function renderGuests() {
  guestList.innerHTML = '';

  guests.forEach(guest => {
    const li = document.createElement('li');

    const categorySpan = document.createElement('span');
    categorySpan.textContent = guest.category;
    categorySpan.className = `category ${guest.category}`;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${guest.name} (${guest.attending ? 'Attending' : 'Not Attending'})`;

    const timeSpan = document.createElement('small');
    timeSpan.textContent = `Added at: ${guest.time}`;
    timeSpan.style.display = 'block';
    timeSpan.style.fontSize = '0.7rem';
    timeSpan.style.color = '#555';

    const btns = document.createElement('div');

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const newName = prompt('Edit guest name:', guest.name);
      if (newName) {
        guest.name = newName.trim();
        renderGuests();
      }
    };

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    };

    btns.append(toggleBtn, editBtn, removeBtn);

    li.append(categorySpan, nameSpan, btns);
    li.appendChild(timeSpan);

    guestList.appendChild(li);
  });
}
